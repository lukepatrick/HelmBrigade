# HelmBrigade


HelmBrigade is a [Brigade](https://github.com/Azure/brigade) Project that utilizes [Helm](https://github.com/kubernetes/helm) [containers](https://hub.docker.com/r/lachlanevenson/k8s-helm/). 

## Prerequisites

1. Have a running [Kubernetes](https://kubernetes.io/docs/setup/) environment
2. Setup [Helm](https://github.com/kubernetes/helm) - this assumes Helm on your Host regardless of the Helm container used later on. 

## Install

### Set up Brigade

Follow the [quick-start guide](https://github.com/Azure/brigade#quickstart):

Install Brigade into your Kubernetes cluster is to install it using Helm.

```bash
$ helm repo add brigade https://azure.github.io/brigade
$ helm install -n brigade brigade/brigade
```

To manually run Brigade Projects the **brig** binary is required. Follow the
[Developers Guide](https://github.com/Azure/brigade/blob/master/docs/topics/developers.md)
to build the binary. Assuming Brigade is cloned and prerequisites met, simply run:
```bash
$ make brig
```
Test **brig** with `brig version`

### Install HelmBrigade

Clone HelmBrigade and change directory
```bash
$ git clone https://github.com/lukepatrick/HelmBrigade
$ cd HelmBrigade
```
Helm install HelmBrigade
> note the name and namespace can be customized
```bash
$ helm install --name helmbrigade brigade/brigade-project -f helmbrigade.yaml
```


## Usage

Manually run the project. The project name is the same as the project value in
the *helmbrigade.yaml*
```bash
$ brig run lukepatrick/HelmBrigade
```

### Slack Demo
Get a [Slack Webhook](https://api.slack.com/incoming-webhooks)

Set up the Slack Environment:
```bash
$ helm upgrade helmbrigade brigade/brigade-project --set secrets.SLACK_WEBHOOK=https://slack.secret.url
```
or at install time:
```bash
$ helm install --name helmbrigade brigade/brigade-project -f helmbrigade.yaml --set secrets.SLACK_WEBHOOK=https://slack.secret.url
```

Edit the slack.js ENV settings for your desired username, title, message, channel, etc..:
```javascript
  slack.env = {
    SLACK_WEBHOOK: p.secrets.SLACK_WEBHOOK,
    SLACK_USERNAME: "brigade-bot",
    SLACK_TITLE: "Hello World!",
    SLACK_MESSAGE: "It's all Kubernetes from here",
    SLACK_COLOR: "#0000ff",
    SLACK_CHANNEL: "general"
  }
```

Manually run the project and override the input script.
```bash
$ brig run lukepatrick/HelmBrigade -f slack.js
```

## Contribute

PRs accepted.

## License

MIT