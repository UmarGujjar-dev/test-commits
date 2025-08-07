import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Path to your data file (used to track commits)
const path = "./data.json";
const git = simpleGit();

const START_DATE = "2024-01-01";
const END_DATE = "2025-05-31";

async function generateCommits() {
  let day = moment(START_DATE);

  while (day.isSameOrBefore(END_DATE)) {
    // Randomize 2 or 3 commits per day
    const numCommits = Math.floor(Math.random() * 2) + 2;

    for (let i = 0; i < numCommits; i++) {
      // Random time during the day
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);

      const commitDate = day
        .clone()
        .hour(hour)
        .minute(minute)
        .second(second)
        .format();

      // Write dummy data
      const data = { date: commitDate };
      await jsonfile.writeFile(path, data);

      // Stage, commit, and set commit date
      await git.add([path]);
      await git.commit(commitDate, undefined, {
        "--date": commitDate,
      });

      console.log( `Committed for ${commitDate}`);
    }

    // Next day
    day.add(1, "day");
  }

  // Push all commits
  await git.push();
}

generateCommits().catch(console.error);
