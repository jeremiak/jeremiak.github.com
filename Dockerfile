FROM circleci/ruby:latest-node

USER root

WORKDIR /site

COPY Gemfile* /site/

RUN bundle install

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--watch"]
