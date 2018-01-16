const CONTAINER = "technosophos/slack-notify:latest"

const { events, Job } = require("brigadier")

events.on("exec", (e, p) => {

  // env info
  console.log("==> Project " + p.name + " clones the repo at " + p.repo.cloneURL)
  console.log("==> Event " + e.type + " caused by " + e.provider)

  var slack = new Job("slack-notify", CONTAINER)

  slack.tasks = []

  slack.tasks.push("/slack-notify")

  slack.storage.enabled = false

  if (!p.secrets.SLACK_WEBHOOK) {
    console.log("==> EMPTY p.secrets.SLACK_WEBHOOK, exiting")
    return
  }

  COLOR = '#'+Math.floor(Math.random()*16777215).toString(16);

  //set up ENV
  slack.env = {
    SLACK_WEBHOOK: p.secrets.SLACK_WEBHOOK,
    SLACK_USERNAME: "brigade-bot",
    SLACK_TITLE: "Hello World!",
    SLACK_MESSAGE: "It's all Kubernetes from here\n ==> Event " + e.type + " caused by " + e.provider,
    SLACK_COLOR: COLOR,
    SLACK_CHANNEL: "general"
  }

  console.log("==> Set up tasks, env, Job ")
  //debug only
  console.log(slack)

  console.log("==> Running slack Job")

  // run slack Job, get Promise and print results
  slack.run().then( resultStart => {
    //debug only
    console.log("==> slack Job Results")
    console.log(resultStart.toString())
    console.log("==> slack Job Done")
  })

})