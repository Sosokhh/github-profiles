import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Repositories, UserProperties} from "./github-profile.model";
import {API} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class GithubProfileService {

  constructor(private http: HttpClient) {
  }

  public getUser(user: string) {
    return this.http.get<UserProperties>(API + user);
  }

  public getRepos(user: string) {
    return this.http.get<Repositories[]>(`${API}${user}/repos?sort=created`);
  }

}
