This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## NVM

This step is optional but it is highly suggested you to use NVM.

Instalation instructions can be found here: https://github.com/nvm-sh/nvm#installing-and-updating

Once installed run:

```bash
nvm use
```

## Setup

Install node dependencies:

```bash
yarn install
```

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Forking from BaseApp

After forking baseapp:

- Run `bash startup.sh` to copy the templates

## NextJS + MUI v5

Settings according to [reference repo](https://github.com/leoroese/nextjs-materialui-v5-tutorial)

## Building docker images for K8s
Our current K8s stack expects 2 images built from the FE Dockerfile. We use a multi-stage Dockerfile, so you need to specify the right **target** for each of them:
* Webapp image (`webapp_image`)
```
docker build --platform linux/amd64 --tag registry.tsl.io/<project>/<project>-webapp:<version> --target runner .
```
* Webapp build image (`webapp_build_image`)
```
docker build --platform linux/amd64 --tag registry.tsl.io/<project>/<project>-webapp-build:<version> --target builder .
```
`<version>` can be anything you want. For example, if you wanted to deploy a baseapp feature that is still in progress just to test it out and its JIRA ID was BA-123, you could use that ID to identify your images. In this example you would run:
```
docker build --platform linux/amd64 --tag registry.tsl.io/baseapp/baseapp-webapp:BA-123 --target runner .
```
and
```
docker build --platform linux/amd64 --tag registry.tsl.io/baseapp/baseapp-webapp-build:BA-123 --target builder .
```

## Storybook

Use this command to run Storybook:

```bash
yarn storybook
```

After that the Storybook tab should open and run on the port 6006.

The stories file should be created following this path:
```bash
...components/MyComponentFolder/stories.@(js|jsx|ts|tsx)
```

This is how it look a Basic Storybook stories file:
```bash
import type { Meta, StoryObj } from '@storybook/react'
import { MY_COMPONENT } from 'MY_COMPONENT_PATH'

const meta: Meta<typeof MY_COMPONENT> = {
  title: 'TITLE_OF_THE_FOLDER_SHOWN_ON_STORYBOOK',
  component: MY_COMPONENT,
}

export default meta
type Story = StoryObj<typeof MY_COMPONENT>

export const NAME_OF_COMPONENT_TO_BE_SHOWN_ON_STORYBOOK: Story = {
  args: {
    DEFAULT_PROPS_FOR_COMPONENT for example:
    label: 'My Default Label'
  },
}
```