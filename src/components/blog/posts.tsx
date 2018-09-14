import * as React from 'react';
import { IPost } from './';

export interface IPostsProps {
  label: string;
}

interface IState {
  posts?: IPost[];
}

export class Posts extends React.Component<IPostsProps, IState> {
  state: IState = {
    posts: undefined
  };

  async componentDidMount() {
    const posts = (await fetch('http://localhost:9000/posts').then(res =>
      res.json()
    )) as IPost[];

    this.setState({
      posts
    });
  }

  renderPost = (post: IPost, idx: number) => {
    return <div key={idx}>{post.title}</div>;
  };

  render() {
    const { posts } = this.state;
    if (!posts) {
      return <div>Loading</div>;
    }

    return <div>{posts.map(this.renderPost)}</div>;
  }
}
