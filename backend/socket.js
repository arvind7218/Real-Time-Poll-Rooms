import { Server } from "socket.io";
import * as PollService from "./services/PollService.js";

const participants = {};

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("create_poll", async (data) => {
      try {
        const poll = await PollService.createPoll(data);
        io.emit("poll_started", poll);
      } catch (error) {
        console.log("cannot create poll", error);
      }
    });

    socket.on("submit_vote", async (data) => {
      try {
        await PollService.submitVote(data);
        const results = await PollService.getPollResults(data.pollId);
        io.emit("poll_results", results);
      } catch (error) {
        socket.emit("vote_error", "Already voted");
      }
    });

    socket.on("join_poll", ({ pollId, studentId, name }) => {
      if (!participants[pollId]) participants[pollId] = [];

      const exists = participants[pollId].some(
        p => p.studentId === studentId
      );

      if (!exists) {
        participants[pollId].push({
          studentId,
          name,
          socketId: socket.id
        });
      }

      io.emit("participants_update", participants[pollId]);
    });

    socket.on("send_message", (msg) => {
      io.emit("receive_message", msg);
    });

    socket.on("kick_student", ({ pollId, studentId }) => {
      const list = participants[pollId] || [];
      const student = list.find(p => p.studentId === studentId);

      if (student) {
        io.to(student.socketId).emit("kicked_out");

        participants[pollId] = list.filter(
          p => p.studentId !== studentId
        );

        io.emit("participants_update", participants[pollId]);
      }
    });

    socket.on("end_poll", async (pollId) => {
      await PollService.endPoll(pollId);
      io.emit("poll_ended");
    });


    socket.on("disconnect", () => {
      for (const pollId in participants) {
        participants[pollId] = participants[pollId].filter(
          p => p.socketId !== socket.id
        );
        io.emit("participants_update", participants[pollId]);
      }
    });
  });
};