import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;
  private i: number;

  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });

  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
    }


  deletePost(id: number) {
    this.i = this.posts.findIndex(post => post.id === id);
    this.posts.splice(this.i, 1);
    this.posts = this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
    // this.posts = this.posts.filter(post => post.id !== id);
  }
}
