# The bubble game

So I was interested to test the new [MJS thing](https://marcelo.tokks.tech/blog/geekle-node-conference-day1#gil-tayarhttpswwwlinkedincomingiltayar---es6-modules-in-nodejs) and I decided to use this project as a clean slate test scenario.

<details>
  <summary>This is what I tried to achieve: (click to expand)</summary>
  <code>
  Background:
Imagine you have a software company providing a service online.
Users can buy one year of this service access, and with credit card pay the daily cost between $5 - 20 per day depending on which plan they're on.  If users are happy with the software/service after one year, then they will renew the service for another year and keep paying daily.
Some customers will love your service (we say they are happy and have "good health"), other customers may be disappointed with the service and have "bad health". Customers with bad health typically don't renew their subscription when it's ending after one year.

All the instructions about the game rules and how to play are in the `index.html` (basically, the homepage), [just open the game](https://bubbles.tokks.tech) and get the higher score possible 🎉

</details>

This application requires no build steps to run on most of the browser due to the recent support of javascript modules `mjs` natively on browsers.

Unfortunately, most browsers treat native module imports locally as CORS, so you can't just open `index.html` on most browsers without a server running behind it.

That's why, the one and only module dependency of this project is [serve](https://www.npmjs.com/package/serve), which is used to statically serve all the files.

`yarn && yarn start` should do the trick to get your server up and running or you can [see the application deployed live at Vercel](https://bubbles.tokks.tech)