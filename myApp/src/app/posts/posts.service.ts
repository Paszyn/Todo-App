import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private postId = 0;
  private i: number;

  getPosts() {
    return this.posts;
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const id = this.postId;
    this.postId++;
    const post: Post = {title, content, id};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
