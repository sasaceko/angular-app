import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from 'rxjs';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];

  constructor(private service: PostService) {

  }

  ngOnInit(){
    this.service.getAll()
    .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post: { title: string, id?: number } = { title: input.value };
    this.posts.splice(0, 0, post);
    input.value = ''
    
    this.service.create(post)
      .subscribe(
        (newPost: any) => {
          post.id = newPost.id;
      }, 
        (error: AppError) => {
          this.posts.splice(0, 1);

          if (error instanceof BadInput) {
            // this.form.setErrors(error);
          }
          else throw error;
      });
  }

  updatePost(post: any) {
    this.service.update(post)
      .subscribe(
        updatedPost => {
          console.log(updatedPost)
      });
  }

  deletePost(post: any) {
    let i = this.posts.indexOf(post);
    this.posts.splice(i, 1);

    this.service.delete(post.id)
      .subscribe(
        null, 
        (error: AppError) => {
          this.posts.splice(i, 0, post);

          if (error instanceof NotFoundError)
            alert('This post has already been deleted.')
          else throw error;
      });
  }
}
