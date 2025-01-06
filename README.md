# lichtblick-extension_autoware_new_planning_framework

The message type for [Trajectories.msg](https://github.com/tier4/new_planning_framework/blob/main/autoware_new_planning_msgs/msg/Trajectories.msg) in [new_planning_framework](https://github.com/tier4/new_planning_framework) is currently visible in the 3D scene. This extension should work regardless to the lichtblick version. To use the extension in the local desktop app, please refer to [Develop](#develop). You should drag and drop the `.foxe` file when using in browser.

## Lichtblick extension

[Lichtblick] allows developers to create extensions, or custom code that is loaded and executed inside the Lichtblick application. This can be used to add custom panels. Extensions are authored in TypeScript using the `@lichtblick/suite` SDK.

## Develop

Extension development uses the `npm` package manager to install development dependencies and run build scripts.

To install extension dependencies, run `npm` from the root of the extension package.

```sh
npm install
```

To build and install the extension into your local Lichtblick desktop app, run:

```sh
npm run local-install
```

Open the Lichtblick desktop (or `ctrl-R` to refresh if it is already open). Your extension is installed and available within the app.

## Package

Extensions are packaged into `.foxe` files. These files contain the metadata (package.json) and the build code for the extension.

Before packaging, make sure to set `name`, `publisher`, `version`, and `description` fields in _package.json_. When ready to distribute the extension, run:

```sh
npm run package
```

This command will package the extension into a `.foxe` file in the local directory.

## Publish

You can publish the extension to the public registry or privately for your organization.
