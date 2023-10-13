# README.md Generator: Node.js and ES6+

## Description

*The what, why, and how:*

It is so tedious to write a README file each time you deploy a project. `No Time For a README` intends to save you time by creating a professional README file questioner.
It's an entirely JS file ran in `Node js`, REPO contains all the files you need to clone into your local folder and run it right away!

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Methodology](#methodology)
* [License](#license)


## Installation

`PLEASE REFER TO THE VIDEO "HOW TO USE"`

To create the README file `git clone` the repo to your local folder.

If you have not installed `inquirer` and `axios` already:

Run `npm install` in order to install the following npm package dependencies as specified in the `package.json`:

* [`inquirer`](https://www.npmjs.com/package/inquirer) will prompt you for your inputs from the command line.
* [`axios`](https://www.npmjs.com/package/axios) will fetch your info from the GitHub API.

Open your terminal and run the command: `node index.js` 

Answer the questioner.

After answering all the prompts, your README file will be named 'ExampleREADME.md' and will be ready for you at the root of the repo.

The README has some automatically generated badges for your repo, it will require for you to provide a GITHUB username and a REPO.


## Usage

When you run `node index.js`, the application uses the `inquirer` npm to prompt you in the command line with a series of questions about project information in order to create a schematic README file.

When you respond your GITHUB username and REPO name, the application uses `axios` to fetch you GITHUB information. A separate prompt is requesting you for an email in case you don't want to pull your GITHUB info!
Finally, the application will generate markdown and a table of contents for the README conditionally based on your responses to the Inquirer prompts (so, if you don't answer the optional questions, such as Installation, an Installation section will not be included in your README). 
` README will also include badges for your GitHub repo.
`
To make this possible we are interacting with the method  `fs.writeFile` is used to generate your project's README.md file taking a variable as an argument and of course the name of your file which for default is `README.md`.

## Methodology

Application uses async functions to await for the user responses and then fetch the info into `axios` to complete the constant `Markdown Template` for the file.
The application also utilizes, as much as possible, syntax and paradigms introduced in ES6 and beyond, including: 

- One main function,
- `const`, `let`,
- Template literals, and
- `async/await` to handle `inquirer`, `axios`, and `fs.writeFile` promises.


## License

Unlicensed

---

## Contact Me!

GitHub: [@robertako97](https://api.github.com/users/robertako97)

Email: roberto.diazgmx@gmail.com

## Mentions:

[@connietran-dev](https://api.github.com/users/connietran-dev)
For the ideas when stuck with the challenge template! Great idea to use modularization to separate files, will include later!

