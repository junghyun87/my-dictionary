# My Dictionary

## Motivation

I frequently use [올ㅋ사전](http://allkdic.xoul.kr/), but it does not provide another dictionary that I also frequently use, and I cannot add new dictionary, so I made it.

## Features

1.  This is the first page. If you click the dictionary icon on the tray, the window shows

    ![feature_1](https://user-images.githubusercontent.com/4505216/43362397-0b270aae-9324-11e8-8077-76367fa78d26.png)

2.  You can change the dictionary to another or edit the list of dictionaries

    ![feature_2](https://user-images.githubusercontent.com/4505216/43362398-0fae9088-9324-11e8-9596-1cb549557564.png)

3.  In Edit page, you can add new dictionaries, delete dictionaries, and change the ordering

    ![feature_3](https://user-images.githubusercontent.com/4505216/43362400-12624b9e-9324-11e8-9aa9-505b25996d6c.png)

4.  `Cmd+Control+Shift+D` is a shortcut to show/hide the app

## Running

```sh
git clone https://github.com/junghyun87/my-dictionary
cd my-dictionary
npm install
npm start
```

## Packaging

```sh
npm run package
open out/my-dictionary-darwin-x64/my-dictionary.app
```

## Acknowledge

This app could be made by using [Electron](https://electronjs.org/), [React.js](https://reactjs.org/), [photon](http://photonkit.com) and other packages.

Much code is from [tray-example](https://github.com/kevinsawicki/tray-example), [electron-bookmark](https://github.com/2woongjae/electron-bookmark) and dependency projects.

Dictionary icon is from [electron-bookmark](https://github.com/2woongjae/electron-bookmark).

# Todo

- Change dictionary icon
- Support other OS.
- Make test cases
