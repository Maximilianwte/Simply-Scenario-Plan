<template>
  <div id="home" class="px-6 md:px-12">
    <div id="top" class="lg:flex min-h-screen pt-24 relative">
      <div class="left lg:w-1/2 flex-col lg:block">
        <h2 class="text-6xl w-80 lg:ml-24 text-center lg:text-left font-extrabold">
          Bad things happen
        </h2>
        <!-- <div class="forProjects flex mt-40 text-center mx-12 text-xl">
        <div id="business" class="flex-col light mx-2">
          <svg
            class="w-20"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M251.1 5.4c-8.7 4.8-5 18.6 4.9 18.6 5.1 0 10-4.9 10-9.9 0-7.5-8.3-12.4-14.9-8.7zM129.3 33.5c-4.1 1.7-6.9 7.1-5.9 11.1.8 3.2 69 72.4 73.8 75 4 2.1 7.3 1.7 10.7-1.2 4.1-3.4 5-8.3 2.3-12.6-3.2-5.1-70.3-71.6-73.5-72.7-3.5-1.3-3.5-1.3-7.4.4zM374.5 33.6c-3.4 1.7-67.1 64.7-71.6 70.8-3.9 5.3-3.8 8.9.5 13.2 3.7 3.7 7 4.3 11.4 2 4.8-2.6 73-71.8 73.8-75 1-4.1-1.8-9.4-6.1-11.2-4.2-1.7-4.3-1.7-8 .2zM252.4 44.9c-1.2.5-3.1 2.2-4.3 3.7-2 2.6-2.1 3.5-2.1 33.6 0 33.5.2 35.2 5.5 37.6 3.3 1.5 5.7 1.5 9 0 5.3-2.4 5.5-4.1 5.5-37.7V51l-2.7-3c-3-3.2-7.5-4.5-10.9-3.1z"
            />
            <path
              d="M100.4 104.1C96.9 105.9 1.6 224.6.6 228.5c-.6 2.3-.6 4.3.2 5.9.6 1.3 12.6 12.3 26.7 24.4l25.6 22 22 29.6c12 16.3 21.9 29.9 21.9 30.3 0 .3-1.3 2.7-3 5.2-8.8 13.8-7.2 31.3 4 43.5 4.6 5 14.7 10.6 19.2 10.6 2.8 0 2.8 0 2.8 6.5 0 4.1.8 8.5 2.1 12.2 4.2 11.4 18.6 22.3 29.3 22.3 3.7 0 4.6 1.2 4.6 6.1 0 1.6.8 4.8 1.7 7.1 5.5 14.1 17.5 22.7 32.7 23.3l6.1.2.7 3.7c2.1 9.9 9.8 19.5 19.6 24.3 5 2.5 6.8 2.8 15.2 2.8 8.5 0 10.1-.3 14.9-2.8 2.9-1.6 7.5-4.9 10.1-7.3 2.6-2.4 5-4.4 5.3-4.4.4 0 2.7 1.5 5.2 3.4 14.2 10.9 33.7 9.9 46.4-2.4 5-4.9 8.9-12.5 10.3-20l1-5.7 5.1-.6c14.7-1.8 27.1-14.1 29.9-29.7l1-5.7 5.1-.6c14.8-1.8 27.1-14 29.9-29.8.9-5.5 1.2-5.9 3.7-5.9 8.9 0 20.9-7 26.4-15.3 7.1-10.7 8.3-23.2 3.2-34.4l-2.4-5.2 16.2-33.9 16.3-33.9 25.3-21.8c13.9-12 25.7-22.9 26.2-24.2.5-1.3.9-3.5.9-4.8 0-2.8-86.5-116-90.8-118.8-1.7-1.1-3.8-1.6-5.9-1.3-1.8.2-15.3 8.2-31.5 18.5L355.3 140h-73.5l-27.7 8c-15.3 4.4-28.7 8-29.7 8-1-.1-14.5-3.5-29.9-7.8l-28-7.7-28.8-18.3c-28.7-18.3-32.9-20.3-37.3-18.1zm25.8 34.5c10.1 6.4 18.9 12.2 19.6 12.9 1.1 1-6.3 10.6-42.1 54.1-23.8 29.1-43.9 52.9-44.5 52.9-2.1 0-35.1-28.9-34.4-30.1 1.8-2.9 81.8-101.4 82.4-101.4.4 0 9 5.2 19 11.6zm324.8 36c20.1 26.2 36.5 47.9 36.5 48.3 0 .8-33.6 30-34.5 30.1-.3 0-18.3-22.5-39.9-50.1-33-42-39.1-50.3-38-51.4 1.7-1.6 38.1-24.5 38.9-24.5.3.1 16.9 21.5 37 47.6zm-54.4 40c23.6 30 42.8 54.8 42.7 55.2-.3 1.2-26.4 55.7-26.9 56.1-.3.3-26.2-25.2-57.7-56.6-56-55.9-57.3-57.1-61.7-57.7-2.5-.3-16.2-1.3-30.5-2.2-23.2-1.6-26.3-1.6-28.9-.2-2.1 1.1-6.5 7.9-17.8 27.9-8.2 14.5-15.7 27.2-16.6 28.3-6.5 7.2-19.1 5.8-24.2-2.6-2.4-4-2.6-10.7-.4-15.1.9-1.8 9.7-17.5 19.6-35l18-31.7 5.2-1.5c2.8-.8 18.8-5.5 35.6-10.4l30.5-8.9 35.1-.1 35.1-.1 42.9 54.6zm-219.1-50.2c5 1.3 10.9 2.9 13.3 3.6 2.3.6 4.2 1.4 4.2 1.9 0 .4-8.1 15.1-18.1 32.7-22.4 39.4-22.6 40-23.7 46.8-2.4 15.2 5.1 30 19 37.3 4.8 2.5 6.2 2.8 15.8 2.8 9.6 0 11-.3 15.8-2.8 8.7-4.6 12.1-9 26.6-34.6l13.8-24.2 3.6.5c2.1.3 12.1 1.1 22.4 1.7l18.6 1.2 61 61.1c54.3 54.3 61.2 61.6 62.2 65.3 3.3 12.7-9.7 23.5-21.3 17.7-1.8-.9-18.7-17.3-37.7-36.5l-34.5-35-4.3.1c-6.8 0-11.4 6-9.8 12.6.5 1.7 14 16 35.5 37.8 37.8 38 38.1 38.4 36.1 46.9-2.1 9.3-12.8 14.3-21.3 10.1-1.8-.8-13.8-12.3-26.7-25.5l-23.5-24-4.6.1c-6.4 0-9.9 3.4-9.9 9.8v4.5l24.4 24.6c20.3 20.4 24.6 25.3 25.5 28.6 3 11.5-6.6 21.3-18.6 19-3.1-.6-6.4-3.3-18.8-15.6-14-13.9-15.2-14.9-18.8-14.9-7.3 0-12.1 6.3-9.7 12.6.6 1.6 7.3 9.2 15 16.9 15.4 15.6 16.9 18.2 14.9 26.2-2.8 10.9-16.1 14.7-25.2 7.2l-3.7-3 1.8-3.2c1.3-2.4 1.7-5.6 1.7-13.2 0-9-.3-10.5-2.8-15.5-4.7-9.2-12.3-15.6-21.8-18.4l-4.1-1.2-.2-8.5c-.2-9.8-3-17-9.1-23.8-4.6-5-14.2-9.9-21.3-10.8-4.8-.5-5.2-.8-5.2-3.3 0-3.9-2.8-12.8-5.4-16.9-3.2-5-10-10.9-15.5-13.4-3.5-1.6-6.6-2.1-13.4-2.2H171l-1.1-4c-2.6-9.9-11.6-19.7-21.5-23.4-4.9-1.9-7.3-2.2-14.4-1.9-8.3.4-13.4 2.2-20.2 7-1.5 1.1-2 .9-3.2-.7-.8-1.1-9.4-12.6-19-25.5-9.7-12.9-17.5-24.1-17.3-24.8.4-2.4 91.9-113.1 93.1-112.7.6.2 5.2 1.5 10.1 2.9zm-33.4 175.9c6.2 4.1 8.5 12 5.5 19-2.2 5.2-17.4 19.3-22.2 20.6-7.7 2.1-15-1.8-17.9-9.4-2.9-7.4-1.6-10.6 7.8-20.3 4.5-4.7 9.6-9.3 11.2-10.3 4.3-2.7 11.3-2.5 15.6.4zm41.5 28.3c6.2 3 9.3 9.6 7.9 17.1-.6 3.1-3.1 6.3-14.8 18.1-7.8 7.9-15.4 15-16.9 15.8-3.9 2-10.7 1.8-14.6-.6-6.5-4-9.2-13.3-5.8-19.8 2-3.8 28.6-29.9 31.6-31.1 3.8-1.5 8.8-1.3 12.6.5zm34.7 35.8c7.1 2.9 11 11.2 8.9 18.4-1.7 5.4-29.2 32.6-34.4 34-8.6 2.3-17.6-3.6-18.5-12.1-.3-2.5-.2-5.8.2-7.4.8-3.4 27.6-30.9 32-32.9 3.9-1.7 7.8-1.7 11.8 0zm31.1 43.9c6.9 3.9 9.5 12.8 6 20.2-.9 1.9-5.3 7-9.9 11.4-6.1 5.9-9.3 8.2-11.9 8.6-5.6 1.1-10.6-.3-14.2-3.9-3-3-5.7-9.4-4.9-11.9.2-.7.6-2.5 1-4.1.4-1.8 3.7-6.2 8.3-10.9 11.2-11.6 17.7-14 25.6-9.4z"
            />
          </svg>
          <h5 class="mt-4">For your business</h5>
        </div>
        <div id="project" class="flex-col mx-2">
          <svg
            class="w-20"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M249 2.7c-15.7 9.3-39.6 31.6-51.3 48-20.3 28.5-33 62-36.8 96.8-1.6 15.2-.5 38.6 2.9 63.5l2.9 20.5-27.5 32c-31.4 36.6-32.7 38.6-32.7 51 .1 6.4.5 9 2.5 13 3.1 6.4 9.1 12.4 15.5 15.5 4.9 2.4 5.6 2.5 31.2 2.8l26.1.3.6 3.7c.3 2 1.3 9.1 2.1 15.7.9 6.6 2.1 13.3 2.7 14.8 1.5 3.9 5.6 5.7 12.8 5.7h6.1l-.3 21.7-.3 21.8-2.9 5.3c-3.5 6.2-7.7 10.2-14.7 13.7-4.6 2.4-5 2.4-5.5.8-3.6-10.9-7.6-17.5-15-24.3-6.5-5.8-15.5-10.4-24.1-12-6.1-1.2-6.2-1.3-9.9-7.4-4.7-7.6-15.3-18-22.7-22.5-21.9-13-46.7-14.5-68.2-4.1C17.8 390.9 0 417.5 0 442.5c0 9.4 2.6 19.2 7.6 29.5 4 7.9 6.2 10.9 13.3 18 9.9 9.7 16.5 13.9 28.8 18.4l8.8 3.1 76.9.3c57.5.2 77.7 0 79.8-.9 4.9-2 7-8.1 4.6-13.4-2.6-5.6-.5-5.5-79.7-5.5-48.8 0-74.8-.4-78.3-1.1-23.1-4.7-41.8-26.8-41.8-49.3 0-10.3 6.4-23.9 15.7-33.2 17.3-17.3 39.3-21 60.5-10.3 6.1 3.1 18.8 14.1 18.8 16.3 0 .6-2.8 2.7-6.1 4.6-8.5 4.8-12.9 9.9-12.9 14.9 0 4.5 3.4 8.6 8 9.6 3.2.7 5.2-.2 11.7-5.1 18.5-14.1 45.1-2.8 47.9 20.3 1.5 12.7 6.6 15.5 22.2 11.8 18.3-4.3 33.8-19 38.4-36.4 1.3-5.2 1.7-11.1 1.7-27.4l.1-20.7h60l.1 20.7c0 16.3.4 22.2 1.7 27.4 4.6 17.4 20.1 32.1 38.4 36.4 15.6 3.7 20.7.9 22.2-11.8 2.8-23.1 29.4-34.4 47.9-20.3 6.5 4.9 8.5 5.8 11.7 5.1 4.7-1 8-5.1 8-9.8 0-3.5-.6-4.7-4.8-8.7-2.6-2.5-7.2-5.8-10.1-7.3l-5.3-2.6 6.2-6.5c13-13.6 32.5-19.5 49.5-15.1 19.2 5.1 36.1 23 39.7 42.3 4.4 23.6-15.1 49.7-41 55.1-3.6.7-29.2 1.1-78.3 1.1-61.2 0-73.4.2-75.8 1.4-6.6 3.5-6.6 13.7 0 17.2 4.4 2.2 146.7 2.1 157.7-.2 38.2-7.9 64.3-44.9 56.8-80.5-3.7-17.2-16-34.9-31.9-45.8-22.7-15.5-52.3-15.9-77.4-1-7.4 4.5-18 14.9-22.7 22.5-3.7 6.1-3.8 6.2-9.9 7.4-8.6 1.6-17.6 6.2-24.1 12-7.4 6.8-11.4 13.4-15 24.3-.5 1.6-.9 1.6-5.5-.8-7-3.5-11.2-7.5-14.7-13.7l-2.9-5.3-.3-21.8-.3-21.7h6.1c7.2 0 11.3-1.8 12.8-5.7.6-1.5 1.8-8.2 2.7-14.8.8-6.6 1.8-13.7 2.1-15.7l.6-3.7 26.1-.3c25.6-.3 26.3-.4 31.2-2.8 6.4-3.2 12.4-9.2 15.5-15.5 1.9-3.9 2.4-6.7 2.4-13 .1-12.3-1.2-14.4-32.6-51l-27.5-32 2.9-20.5c6.3-45.1 4.5-73-6.6-106.5-9.8-29.3-23.9-52.5-45-74.4C281.3 14.4 261.9 0 256.1 0c-1.4 0-4.6 1.2-7.1 2.7zm16.1 25.7c8.2 6.2 24.2 22 28.8 28.5l2.2 3.1h-80.2l2.2-3.3C224 48.4 252.7 22.1 256 22c.3 0 4.4 2.9 9.1 6.4zm45.4 54c3.2 4.8 10.6 22.8 13.9 33.8 5.5 18.4 7 28.8 7.1 50.3 0 18.5-.2 20.8-9.4 89.2l-9.5 70.3H199.4l-9.4-69.8c-6.5-48.4-9.5-73.9-9.8-83.4-.9-28.8 4.7-55.3 17.5-82.9l4.6-9.9H309l1.5 2.4zM174.9 292.5c2.3 17.6 4.1 32.4 4.1 32.8 0 .4-10.3.7-22.9.5l-23-.3-3-2.9c-3.4-3.3-4.8-8.1-3.4-12.1 1.1-3.3 42.5-51.8 43.3-50.8.4.5 2.5 15.2 4.9 32.8zm189.6-8c10.8 12.6 20.1 24.1 20.7 25.5 1.5 3.9.2 9.1-3.2 12.5l-3 3-23 .3c-12.7.2-23-.1-23-.5-.1-1.6 8.2-63.8 8.6-65.2.6-1.8-1.2-3.7 22.9 24.4zm-54.9 64.2c-.3 1.6-.8 5.3-1.1 8.3-.4 3-.9 6.3-1.1 7.2-.5 1.7-3.8 1.8-51.4 1.8s-50.9-.1-51.4-1.8c-.2-.9-.7-4.2-1.1-7.2-.3-3-.8-6.7-1.1-8.3l-.6-2.7h108.4l-.6 2.7z"
            />
            <path
              d="M244.3 127.4c-18.1 4.4-33.4 20.2-37.2 38.4-3.5 16.6 1.5 33 13.8 45.3 19.9 19.9 50.3 19.9 70.2 0 19.9-19.9 19.9-50.3 0-70.2-12.6-12.6-29.9-17.6-46.8-13.5zm25.1 22c10.5 5.1 16.1 14.4 16.1 26.6 0 8.5-2.1 14.2-7.4 20.3-8.2 9.2-23.7 12.1-35.3 6.4-16-7.9-21.5-27.8-11.8-43 8-12.6 24.6-17 38.4-10.3zM251.1 493.4c-8.7 4.8-5 18.6 4.9 18.6 5.1 0 10-4.9 10-9.9 0-7.5-8.3-12.4-14.9-8.7z"
            />
          </svg>
          <h5 class="mt-4">For your project</h5>
        </div>
        <div id="hobby" class="flex-col mx-2">
          <svg class="w-20" version="1.0" viewBox="0 0 512 512">
            <path
              d="M171.5 4.7C86.4 8.6 17.7 69.8 2.4 155c-2.1 11.8-2.4 41.9-.5 53.5 5.2 32.3 15.7 57.7 34 82.3 15.8 21.3 40.7 42.2 62.9 52.6 3.4 1.6 6.2 3.2 6.2 3.5 0 .3-3.3 2.5-7.3 4.7-15.6 9-30.4 20.6-53.6 42.3C30 407.1 27 411.8 27 421c0 6.7 3.3 14.1 8.1 18.6 5.4 5 31.2 24 42.7 31.5 25 16.3 55.3 28 86.7 33.4 22.1 3.8 65.5 4.3 90.3 1 39-5.2 72.1-18.4 105.4-42.2 11.5-8.2 12-8.4 21.8-10.4 53.5-10.7 98.3-48.1 118.5-98.8 16.4-41.3 14.8-88-4.5-128.7-23.1-48.8-67.5-82.2-121-91-4.7-.7-11-1.4-14-1.5-9.8-.2-9.9-.3-14-11.4-17.9-49-57.4-88.2-107-106.3-21.2-7.7-46.3-11.6-68.5-10.5zM212 25c13.3 2.8 23.7 6.4 36.7 12.5 10.5 5 27.5 15.9 35.3 22.5l3.5 3L253 97.5l-34.5 34.6-3.8-4.3c-6-6.8-15.5-21.4-20.7-31.8-8.9-17.7-14.9-39.2-16.5-58.5-.3-4.4-.9-9.8-1.2-11.9l-.5-3.9 13.3.6c7.4.4 17.7 1.6 22.9 2.7zm-52.6 2.2c.2 2.4 1 9.2 1.6 15.3 3.6 35.2 18.1 69.8 40.4 95.8l4.9 5.9-13.6 13.6-13.7 13.7-54.1-54-54-54 4.8-4.3c16.7-15.1 44.9-28.8 70.3-34.1 13.3-2.7 12.8-2.8 13.4 2.1zm145.4 54.2c6.7 8.2 14.3 19.8 18.7 28.6 4 8 9.8 22.1 9.2 22.6-.2.2-4.4 1.1-9.3 1.9-20.5 3.5-47.3 14.1-62.9 24.8l-5 3.4-8.5-5.8c-4.7-3.2-10.3-7.4-12.5-9.3l-4-3.5 34.5-34.5c19-19 34.5-34.6 34.6-34.6 0 0 2.4 2.9 5.2 6.4zm-191.5 48.4l53.7 53.7-13.4 13.4-13.5 13.4-6.8-5.5c-29.3-23.9-65.3-38-103.6-40.5-7.2-.4-10-1-10.4-2-.8-2.1 2.3-16.9 5.8-28.1 3.8-12 11.1-27.6 17.4-37.3C47.7 88.8 57.7 76 58.8 76c.4 0 24.9 24.2 54.5 53.8zm258.2 21.3c15.1 2.4 16.7 3 18.2 6.7.8 1.9 1.3 3.5 1.1 3.7-.2.1-9.4 6.6-20.6 14.4l-20.3 14.2-20.5-14.3c-18.9-13.2-20.4-14.5-19.9-16.8 1-3.9 2.4-4.7 11-6.5 16.3-3.4 35.6-3.9 51-1.4zm-147.1 10.2c2.8 2.4 7.6 6 10.6 8.2 3 2.1 5.7 4 5.9 4.2.2.1-3.2 4-7.6 8.6-4.3 4.5-10.6 11.8-13.8 16l-5.8 7.8-10.9-10.8c-5.9-5.9-10.8-11.2-10.8-11.8 0-1.2 25.1-26.5 26.4-26.5.5 0 3.2 1.9 6 4.3zm65.6 3.6c0 3.5 4.7 7.5 27.9 23.6l23 16 .1 17.1v17l-21.6 14.6-21.5 14.6-17.6-7.1-17.7-7.2-8.2-20.4c-8.3-20.7-9.5-22.6-15.6-25.2-1.6-.6-2.8-1.8-2.8-2.6 0-2.4 21.9-23.4 30.5-29.3 7.6-5.2 21.1-12.9 22.8-13 .4 0 .7.9.7 1.9zm126.3.7c7.8 4 20.3 12.5 28.6 19.5l7.3 6.2-3 1.3c-1.7.7-3.5 2.1-4 3.1s-4.5 14.2-8.7 29.3c-4.3 15.1-8.3 28-8.9 28.7-.6.7-6.9 3.9-14.1 7.1l-12.9 6-21.1-14.2-21-14.1-.3-16.6-.2-16.7 24.3-17c13.4-9.4 24.8-17.7 25.5-18.5.7-.8 1.3-2.6 1.4-4.1.3-3.2.6-3.2 7.1 0zM49 183.9c12.9 2.3 29.1 7.6 41.5 13.6 9.4 4.5 26.9 15.7 33.8 21.7l3.7 3.3L93.5 257l-34.6 34.5-4-4.5c-15.2-17.3-29.3-46.6-34.3-71.5-1.3-6.5-3.5-27.1-3.6-33.4 0-1.9 17.2-.9 32 1.8zm143.3 24.9l12.8 12.9-2.6 5.9c-6.4 14.1-11.7 33-13.1 46.6-.4 3.8-1 6.8-1.4 6.8-.4 0-1.5-2.1-2.5-4.8-5.2-14-17.6-34.8-28.4-47.7l-5-6 13.2-13.3c7.2-7.2 13.4-13.2 13.7-13.2.3 0 6.3 5.8 13.3 12.8zm279.1 6.9c10.5 16.3 17.9 35.2 21.2 54.2 1.8 10.2 1.8 10.4-.2 11.8-4.5 3.3-5.5 2.9-26-10.7-11-7.3-20.2-13.5-20.6-13.9-.5-.5 10.3-40.7 12.7-46.9.2-.7 2.2-1.2 4.5-1.2 3.9 0 4.2.2 8.4 6.7zm-241.5 6.7c1.8 1 4.1 5.5 9.3 18.6l6.9 17.4-17 17-17 17-3.6-1.7c-4.1-1.9-4.1-2.1-2-16.2 2.8-18.2 8.8-36.9 16-49 2.8-4.8 3.6-5.2 7.4-3.1zm-81 23.2c13.8 18.5 24.4 41.7 29 64.2 1.2 5.5 2.1 10.7 2.1 11.5 0 1-1.7 1.7-5.2 2.1-7.6 1-30.1 7-39.6 10.5l-8.3 3.1-9.4-3.9c-15.1-6.2-28.5-14.4-44-26.9l-2.9-2.3 34.4-34.4c19-19 34.8-34.5 35.2-34.5.4 0 4.3 4.8 8.7 10.6zm222 22c15.3 10.3 20.1 14 19.7 15.2-.3.9-3.3 11.5-6.7 23.4l-6.2 21.8h-55.6l-1.5-4.9c-9.2-31.2-12-42.3-10.6-43.1.8-.5 9.8-6.5 20-13.4s19-12.5 19.6-12.5c.7-.1 10.2 6 21.3 13.5zm-71.3 44.2c4.5 15.5 8 28.2 7.9 28.2-.2 0-4.9-1.8-10.6-4.1-22.5-8.9-49.4-14.5-74.6-15.6l-15.2-.6-.6-4.9c-.8-5.7-.5-6.4 2.3-4.9 1.2.6 3.5 1.1 5.3 1.1 2.9 0 5.5-2.2 23.7-20.4l20.5-20.3 16.6 6.6 16.6 6.7 8.1 28.2zm160.3-24.9c13.4 8.9 25.2 16.1 26.4 16.1 1.2-.1 3.3-.7 4.7-1.5 1.4-.8 2.7-1.4 3.1-1.5.8 0-.9 15.5-2.7 24.3-1.7 8.6-5.8 21-9.9 30.4l-2.7 6.2-3.3-3.4-3.2-3.5h-58.8l-9.9-9.9-9.9-9.9 7.4-26.1 7.4-26 12.5-6c6.9-3.2 13-5.8 13.6-5.6.6.2 12 7.6 25.3 16.4zM232.5 338c38.4 3.6 75.1 17.6 106 40.4 12.5 9.2 42.1 36.2 43.5 39.7 2.2 5.3.2 7.8-17.9 21.3-27 20.1-42.7 29.4-63.3 37.1-29.1 10.8-47.9 13.9-87.3 13.9-35.7 0-53.3-2.4-77.9-10.6-27.2-9-43-17.8-75.8-42.5-19.8-14.9-20-15.8-7.1-28.1 28.5-27.2 48.8-41.7 74.1-53.1 33.7-15.2 69.9-21.4 105.7-18.1zm157.4 17.4l9.3 9.3-7.6 15.2-7.6 15.2-11.8-10.7c-16.5-15-32.4-26.8-48.8-36.1l-3.9-2.2 30.5-.1h30.5l9.4 9.4zm76 19.4l2 3.9-4.6 5.9c-10 12.8-25.5 26.2-40.9 35.3-7.1 4.2-23.4 11.5-24 10.8-.2-.2.1-1.8.7-3.6 1.4-3.8.6-11.9-1.4-15.8-1.4-2.6-1.1-3.4 7.9-21.5L415 371h49l1.9 3.8z"
            />
            <path
              d="M133.4 389c-3.6 1.4-5.4 5-5.4 10.6v5.1l-6.2.6c-5.1.5-6.7 1-8.5 3.2-3 3.4-2.9 7.5.2 10.9 2.1 2.3 3.2 2.6 8.5 2.6h6v5c0 5.5 2 10.4 4.5 11.4 3.5 1.3 7.6.6 10-1.9 2.1-2 2.5-3.4 2.5-8.5v-6h17v5c0 5.5 2 10.4 4.5 11.4 3.1 1.2 7.3.6 9.6-1.3 1.9-1.5 2.5-3.2 2.9-8.3l.5-6.3 8.3-.3 8.2-.3v4.5c0 8.3 2.9 12.5 8.6 12.6 5.4 0 7.8-2.9 8.4-10.2l.5-6.3 8.1-.3 8.1-.3.6 6.2c.7 7.6 3.3 10.9 8.7 10.9 5.4 0 7.8-3 8.2-10.5l.3-6h17l.3 6c.4 7.5 2.8 10.5 8.2 10.5 5.4 0 8-3.3 8.7-10.9l.6-6.1h5.7c4.6 0 6-.4 7.7-2.3 2.9-3.2 3.4-5.2 2.1-8.8-1.3-3.7-5.7-5.9-11.8-5.9-4 0-4 0-4-3.9 0-2.1-.5-5.3-1.1-7.1-2.1-6-10.7-7.3-14.5-2.2-.8.9-1.4 4.3-1.4 7.4v5.8h-18v-5.8c0-3.1-.6-6.5-1.4-7.4-3.8-5.1-12.4-3.8-14.5 2.2-.6 1.8-1.1 5-1.1 7.1v3.9h-17v-5.8c-.1-6.4-1.3-8.7-5.8-10.3-6.3-2.2-11.2 3.2-11.2 12.2v3.9h-17v-5.8c0-5-.4-6.2-2.5-8.2-3.3-3.1-8.7-3.2-11.7-.2-1.6 1.6-2.3 3.7-2.6 8.2l-.4 6H145v-5.4c0-4.3-.5-6-2.2-8-2.6-2.9-6.3-3.9-9.4-2.6z"
            />
          </svg>
          <h5 class="mt-4">For your hobbies</h5>
        </div>
      </div> -->
      </div>
      <div class="right lg:w-1/2 mt-24 lg:mt-0 flex-col">
        <carousel class="mt-12 w-72 h-80" />
      </div>
      <div class="arrowBounce absolute bottom-0 mb-8 centerX">
        <a href="#video" alt="Scroll down" title="More content below">
          <svg class="w-8" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M249.2 1.1c-4.5 1.3-10.8 8-12.1 12.6-.8 2.6-1.1 69.9-1.1 216.8v213l-36.7-36.7c-20.3-20.2-38.1-37.2-39.6-37.8-3.7-1.3-11.8-1.3-15.4.1-9.7 3.6-14.9 16.7-10.5 26.1 2 4.3 106.2 110.4 112 114 5.2 3.3 15.2 3.3 20.4 0 5.8-3.6 110-109.7 112-114 4.4-9.4-.8-22.5-10.5-26.1-4-1.5-12.2-1.4-16 .3-1.8.8-19.2 17.4-39.2 37.5l-36 36.1-.5-214.7-.5-214.8-2.4-3.8c-4.7-7.6-15.1-11.3-23.9-8.6z" />
          </svg>
        </a>
      </div>
    </div>
    <div class="below flex-col">
      <div id="video" class="w-full lg:w-2/3 mt-20 h-80 border">
        <p class="mt-2 ml-2 text-alternative">Video</p>
      </div>
      <div class="cta flex-col mt-6">
        <router-link to="/register">
          <button class="bg-focus hover:bg-main text-white text-xl rounded py-2 px-4">
            Register
          </button>
        </router-link>
        <p>The app is 100% free.</p>
      </div>
      <div id="template" class="flex mt-64 border rounded">
        <div class="left h-full md:w-1/4 border-r-2">
          <p class="mt-4 ml-4 mb-2 text-alternative">Templates</p>
          <ul @mouseleave="
              setMouse != true ? (activeHoverTemplate = 'smallBusiness') : ''
            ">
            <li class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer" @click="setMouse = true"
              @mouseover="activeHoverTemplate = 'smallBusiness'">
              Small Business Plan
            </li>
            <li class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer" @click="setMouse = true"
              @mouseover="activeHoverTemplate = 'salesPitch'">
              Sales Pitch Scenario Plan
            </li>
            <li class="px-4 py-2 bg-gray-100 hover:bg-gray-300 cursor-pointer" @click="setMouse = true"
              @mouseover="activeHoverTemplate = 'fantasyDraft'">
              Fantasy Basketball Draft Plan
            </li>
          </ul>
        </div>
        <div class="right relative md:w-96">
          <img class="w-full" :src="resolve_img_url(getTemplateImage)" alt="" />

          <button
            class="bg-main hover:bg-alternative absolute bottom-0 right-0 mb-4 mr-6 text-white text w-48 rounded py-2 px-4"
            @click="clickStartWithTemplate">
            Start customizing the template
          </button>
        </div>
      </div>
      <h4 class="text-3xl font-extrabold lg:w-full lg:px-16 mt-40 mb-12">
        What we are building on
      </h4>
      <div id="features" class="lg:flex mb-24 relative">
        <div class="left lg:w-1/2 flex-col justify-start">
          <div id="featureTracker" class="px-8 py-4">
            <h4 class="text-xl">Upcoming Features</h4>
            <p class="text-base text-alternative">
              What features will be released next?
            </p>
            <ul class="mt-8 mb-4">
              <li class="flex items-center justify-between">
                <div class="text">
                  <h6 class="mr-4">1. Backend Integration</h6>
                  <p class="text-sm text-alternative">
                    Release in {{ getDayToRelease("05/20/2021") }} days.
                  </p>
                </div>
                <progressBar class="" :loadState="getLoadState('05/19/2021', 40)" />
              </li>
              <li class="flex items-center justify-between mt-4">
                <div class="text">
                  <h6 class="mr-4">2. More charting features</h6>
                  <p class="text-sm text-alternative">
                    Release in {{ getDayToRelease("05/31/2021") }} days.
                  </p>
                </div>
                <progressBar class="" :loadState="getLoadState('05/31/2021', 40)" />
              </li>
            </ul>
          </div>
        </div>
        <div class="right lg:w-1/2 flex-col justify-start">
          <div id="featureVoter" class="px-8 py-4 mt-8">
            <h4 class="text-xl">Vote Features</h4>
            <p class="text-base text-alternative">
              What feature do you want built next?
            </p>
            <ul class="mt-8 mb-4">
              <li class="flex items-center">
                <h6 class="mr-4">1. More colors</h6>
                <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
                  Vote
                </button>
              </li>
              <li class="flex items-center mt-4">
                <h6 class="mr-4">2. Saving all data</h6>
                <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
                  Vote
                </button>
              </li>
              <li class="flex items-center mt-4">
                <input type="text" class="w-40 border-2 rounded mr-4" placeholder="3. New input" />
                <button class="bg-focus hover:bg-main text-white rounded px-4 py-2">
                  Vote
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="menu" class="absolute top-0 text-xl right-0 py-2 px-2">
        <template v-if="getLogin == false" id="notLoggedIn">
          <router-link to="/register">
            <button class="rounded py-1 px-2 mx-2">Register</button>
          </router-link>
          <router-link to="/login">
            <button class="border-2 border-main hover:border-alternative hover:text-alternative rounded py-1 px-2">
              Login
            </button>
          </router-link>
        </template>
        <template v-else id="LoggedIn">
          <router-link to="/app">
            <button class="border-2 border-main hover:border-alternative hover:text-alternative rounded py-1 px-2">
              Start App
            </button>
          </router-link>
          <router-link to="/profile">
            <button class="py-1 px-2 hover:text-alternative">Profile</button>
          </router-link>
          <button class="py-1 px-2 hover:text-alternative" @click="handleLogout">
            Logout
          </button>
        </template>
      </div>
      <div class="footer absolute bottom-0 left-0 my-2 mx-4">
        <router-link to="/imprint">
          <h2>Imprint</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import carousel from "../components/svgCarousel";
  import progressBar from "../components/progressBar";
  import store from "../store";
  export default {
    components: {
      carousel,
      progressBar
    },
    data() {
      return {
        setMouse: false,
        activeHoverTemplate: "smallBusiness",
      };
    },
    computed: {
      getTemplateImage() {
        switch (this.activeHoverTemplate) {
          case "smallBusiness": {
            return "template1.png";
          }
          case "salesPitch": {
            return "salesPitchPathHere";
          }
          default: {
            return "show image here of the template";
          }
        }
      },
      getLogin() {
        return store.state.user.login;
      },
    },
    methods: {
      resolve_img_url: function (path) {
        let images = require.context("../assets/", false, /\.png$|\.jpg$/);
        return images("./" + path);
      },
      getDayToRelease(releaseDay) {
        var release = new Date(releaseDay);
        var today = new Date();
        var difference = Math.round(
          (release.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        return difference > 0 ? difference : "0";
      },
      getLoadState(releaseDay, fullDevTime) {
        var untilRelease = this.getDayToRelease(releaseDay);
        return Math.round(100 - (untilRelease / fullDevTime) * 100);
      },
      clickStartWithTemplate() {
        const states = {
          smallBusiness: {
            // ---- UI ----
            ui: {
              colorful: store.state.ui.colorful,
              dark: false,
              // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
              uiStep: 0,
            },
            // ---- User Data
            user: {
              login: store.state.user.login,
              id: store.state.user.id,
              email: store.state.user.email,
              fileName: null,
              // put in a time here
              lastChanged: null,
            },

            // ---- Variables ----

            outcomeVariables: [{
                id: 0,
                displayId: 0,
                title: "Sales",
                color: "#F2E5AA",
                top: 6,
                left: 4,
              },
              {
                id: 1,
                displayId: 1,
                title: "Employee Happiness",
                color: "#85E0FF",
                top: 16,
                left: 4,
              },
            ],
            scenarioVariables: [
              [{
                  id: 0,
                  displayId: 0,
                  title: "Economic Boom",
                  prob: 40,
                  impact: [0, 0],
                  unit: ["", ""],
                  color: "#F2E5AA",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "Economic Recession",
                  prob: 17.5,
                  impact: [0, 0],
                  unit: ["", ""],
                  color: "#91DBBC",
                },
              ],
              [{
                  id: 0,
                  displayId: 0,
                  title: "New product is a success",
                  prob: 40,
                  impact: [20, 7.5],
                  unit: ["%", "%"],
                  color: "#F2E5AA",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "Competitor launches better product",
                  prob: 17.5,
                  impact: [-20, -15],
                  unit: ["%", "%"],
                  color: "#91DBBC",
                },
                {
                  id: 2,
                  displayId: 2,
                  title: "Key employee leaves",
                  prob: 17.5,
                  impact: [-5, -30],
                  unit: ["%", "%"],
                  color: "#FFBCB5",
                },
              ],
            ],
            // ---- Connected Shapes ----
            // ["outcomeVariables0", "scenarioVariables_1#1"]
            connectedShapes: [
              ["scenarioVariables_1#0", "scenarioVariables_2#0"],
              ["scenarioVariables_1#0", "scenarioVariables_2#1"],
              ["scenarioVariables_1#0", "scenarioVariables_2#2"],
              ["scenarioVariables_1#0", "scenarioVariables_2#1"],
              ["scenarioVariables_1#1", "scenarioVariables_2#1"],
              ["scenarioVariables_1#1", "scenarioVariables_2#2"],
            ],
            connectedShapesOutput: [],
            // ---- Return Cache ----

            returnCache: {
              returnIndex: 0,
              values: [],
            },
          },
          salesPitch: {
            // ---- UI ----
            ui: {
              colorful: store.state.ui.colorful,
              dark: false,
              // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
              uiStep: 0,
            },
            // ---- User Data
            user: {
              login: store.state.user.login,
              id: store.state.user.id,
              email: store.state.user.email,
              fileName: null,
              // put in a time here
              lastChanged: null,
            },

            // ---- Variables ----

            outcomeVariables: [{
                id: 0,
                displayId: 0,
                title: "Sale succesful done",
                color: "#91DBBC",
                top: 6,
                left: 4,
              },
              {
                id: 0,
                displayId: 0,
                title: "Lead generated",
                color: "#F2E5AA",
                top: 6,
                left: 4,
              }
            ],
            scenarioVariables: [
              [{
                  id: 0,
                  displayId: 0,
                  title: "Call accepted",
                  prob: 33,
                  impact: [20, 45],
                  unit: ["%", "%"],
                  color: "#85E0FF",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "Call rejected",
                  prob: 66,
                  impact: [-60, -40],
                  unit: ["%"],
                  color: "#F2E5AA",
                }
              ],
              [{
                  id: 0,
                  displayId: 0,
                  title: "Says, he/she has no time",
                  prob: 40,
                  impact: [-40, -25],
                  unit: ["%", "%"],
                  color: "#F2E5AA",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "Shedules next call.",
                  prob: 30,
                  impact: [10, 20],
                  unit: ["%", "%"],
                  color: "#91DBBC",
                },
                {
                  id: 2,
                  displayId: 2,
                  title: "Accepts to shedule demo presentation.",
                  prob: 25,
                  impact: [30, 70],
                  unit: ["%", "%"],
                  color: "#91DBBC",
                },
              ],
            ],
            // ---- Connected Shapes ----
            // ["outcomeVariables0", "scenarioVariables_1#1"]
            connectedShapes: [
              ["scenarioVariables_1#0", "scenarioVariables_2#0"],
              ["scenarioVariables_1#0", "scenarioVariables_2#1"],
              ["scenarioVariables_1#0", "scenarioVariables_2#2"],
              ["scenarioVariables_1#0", "scenarioVariables_2#1"],
              ["scenarioVariables_1#1", "scenarioVariables_2#1"],
              ["scenarioVariables_1#1", "scenarioVariables_2#2"],
            ],
            connectedShapesOutput: [],
            // ---- Return Cache ----

            returnCache: {
              returnIndex: 0,
              values: [],
            },
          },
          fantasyDraft: {
            // ---- UI ----
            ui: {
              colorful: store.state.ui.colorful,
              dark: false,
              // uiStep 0 (declare outcomeVariables), 1 (declare scenarioVariables)
              uiStep: 0,
            },
            // ---- User Data
            user: {
              login: store.state.user.login,
              id: store.state.user.id,
              email: store.state.user.email,
              fileName: null,
              // put in a time here
              lastChanged: null,
            },

            // ---- Variables ----

            outcomeVariables: [{
              id: 0,
              displayId: 0,
              title: "Draft success",
              color: "#85E0FF",
              top: 6,
              left: 4,
            }],
            scenarioVariables: [
              [{
                  id: 0,
                  displayId: 0,
                  title: "Drafted LeBron",
                  prob: 15,
                  impact: [20],
                  unit: ["%"],
                  color: "#91DBBC",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "Drafted highest projected player",
                  prob: 10,
                  impact: [12],
                  unit: ["%"],
                  color: "#91DBBC",
                },
                {
                  id: 2,
                  displayId: 2,
                  title: "Drafted another player",
                  prob: 40,
                  impact: [-20],
                  unit: ["%"],
                  color: "#91DBBC",
                },
              ],
              [{
                  id: 0,
                  displayId: 0,
                  title: "Don't have any major injuries in lineup",
                  prob: 25,
                  impact: [40],
                  unit: ["%"],
                  color: "#F2E5AA",
                },
                {
                  id: 1,
                  displayId: 1,
                  title: "First round pick gets injured",
                  prob: 5,
                  impact: [-15],
                  unit: ["%"],
                  color: "#91DBBC",
                },
              ],
            ],
            // ---- Connected Shapes ----
            // ["outcomeVariables0", "scenarioVariables_1#1"]
            connectedShapes: [
              ["scenarioVariables_1#0", "scenarioVariables_2#0"],
              ["scenarioVariables_1#0", "scenarioVariables_2#1"],
              ["scenarioVariables_1#1", "scenarioVariables_2#0"],
              ["scenarioVariables_1#1", "scenarioVariables_2#1"],
            ],
            connectedShapesOutput: [],
            // ---- Return Cache ----

            returnCache: {
              returnIndex: 0,
              values: [],
            },
          },
        };
        console.log(states[this.activeHoverTemplate]);
        store.commit("setCompleteState", states[this.activeHoverTemplate]);
        // for testing purpose
        this.$router.push({
          path: "app"
        });
        // check login state
        /* if (store.state.ui.login == true) {
          this.$router.push({ path: "app" });
        } else {
          this.$router.push({ path: "login", query: { sendFrom: "template" } });
        } */
      },
      handleLogout() {
        store.commit("setLogout");
      }
    },
  };
</script>