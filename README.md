# jeremiak.com
Personal little corner of the internet

[![CircleCI](https://circleci.com/gh/jeremiak/jeremiak.com/tree/master.svg?style=svg)](https://circleci.com/gh/jeremiak/jeremiak.com/tree/master)

## building and running

```
$ docker build -t jeremiak:latest .
$ docker run -it --rm -p 4000:4000 --volume $PWD:/site jeremiak
```
