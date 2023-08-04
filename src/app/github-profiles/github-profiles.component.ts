import {Component} from '@angular/core';
import {Repositories, UserProperties} from "./github-profile.model";
import {GithubProfileService} from "./github-profile.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-github-profiles',
  templateUrl: './github-profiles.component.html',
  styleUrls: ['./github-profiles.component.scss']
})
export class GithubProfilesComponent {
  user: UserProperties = {} as UserProperties;
  repos: Repositories[] = [];
  username: string = ''
  showCard: boolean = false;
  errorMessage: string = '';

  constructor(private githubProfileService: GithubProfileService) {
  }

  onSubmit() {
    if (this.username) {
      this.githubProfileService.getUser(this.username).subscribe({
        next: (data: UserProperties) => {
          this.user = data;
          this.getRepos();
        },
        error: (error: HttpErrorResponse) => {
          this.showCard = false;
          if (error.status === 404) {
            this.errorMessage = 'No profile with this username';
          } else {
            this.errorMessage = error.message;
          }
        }
      });
    }
  }


  getRepos() {
    this.githubProfileService.getRepos(this.username).subscribe({
      next: (data: Repositories[]) => {
        this.repos.push(...data);
        this.showCard = true;
        this.username = '';
      },
      error: () => {
        this.errorMessage = 'Problem fetching repositories';
      }
    });
  }

}
