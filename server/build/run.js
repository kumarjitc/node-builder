const { spawn } = require("child_process");
const { Socket } = require("../routes//socket-routes");
const { build } = require("../db/load");
const { Insert } = require("../db/update");
const Delete = require("../db/delete");

const BUILD_DB_FIELD = "message";
const INTENT_MESSAGE_INTERVAL = 60000;

const execute = (build) => {

  const socket = new Socket();

  console.log("Initiating Commuication To Users");
  socket
    .init()
    .then(data => {
      const execution = spawn(build.command, build.params, {
        cwd: build.context
      });

      const intentId = setInterval(() => {
        console.log('Dayumn, Still Running');
        socket.send("message", 'Compilation and Build still running; This is an intent message to keep you motivated!');
      }, INTENT_MESSAGE_INTERVAL);
      socket.send("message", "Build Process Started");
      execution.stdout.on("data", data => {
        console.log("stdout", `${data}`);
        socket.send("message", `${data}`);
      });

      execution.stderr.on("data", data => {
        socket.send("message", `${data}`);
      });

      execution.stdin.on("data", data => {
        socket.send("message", `${data}`);
      });

      execution.on("error", error => {
        socket.send("error", `${error}`);
        socket.terminate();
      });

      execution.on("close", code => {
        clearInterval(intentId);
        console.log(`child process exited with code ${code}`);
        if (code) {
          socket.send("error", "Build Terminated With Errors");
        } else {
          socket.send("completed", "Build Process Completed Successfully");
        }

        socket.terminate();
      });
    })
    .catch(error => {
      console.log("Error ", error);
    });
};

/*const execute1 = cmd => {
  const appPath = [__dirname, "app", "test-app"].join(path.sep);
  const execCmd = `sh`;

  new Delete(build).execute();

  const socket = new Socket();

  console.log("Initiating Commuication To Users");
  socket
    .init()
    .then(data => {
      const execution = spawn(execCmd, ["ng", "build", "--progress=true"], {
        cwd: appPath
      });

      socket.send("started", "Build Process Started");
      execution.stdout.on("data", data => {
        new Insert(build).addField(BUILD_DB_FIELD, `${data}`).execute();
        socket.send("message", `${data}`);
      });

      execution.stderr.on("data", data => {
        new Insert(build).addField(BUILD_DB_FIELD, `${data}`).execute();
        socket.send("message", `${data}`);
      });

      execution.on("error", error => {
        console.log(`child process exited with error ${error}`);
        socket.send("error", `${error}`);
        socket.terminate();
      });

      execution.on("close", code => {
        console.log(`child process exited with code ${code}`);
        if (code) {
          socket.send("error", "Build Terminated With Errors");
        } else {
          socket.send("completed", "Build Process Completed Successfully");
        }

        socket.terminate();
      });
    })
    .catch(error => {
      console.log("Error ", error);
    });
};*/

module.exports = {
  execute: execute
};
