import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderData, AboutData, SkillsData, ProjectsData, EducationData } from './../models/data.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'http://localhost:8081/api';


  constructor(private http: HttpClient) { }
/////////////////////////////// LOGIN ///////////////////////////////////////
  login(username: string, password: string) {
    let body = {username, password};
    return this.http.post<any>(`${this.url}/auth/authenticate`, body)
    .pipe(map(data => {
      if(data?.jwt) {
        return data.jwt;
      } else {
        return null;
      }
    }));
  }
/////////////////////////////// HEADER ///////////////////////////////////////
  getHeader() {
    return this.http.get<HeaderData>(`${this.url}/header`);
  }

  updateHeader(header: HeaderData){
    return this.http.put<HeaderData>(`${this.url}/header`, header);
  }
/////////////////////////////// ABOUT ///////////////////////////////////////
  getAbout() {
    return this.http.get<AboutData>(`${this.url}/about`);
  }

  updateAbout(about: AboutData) {
    return this.http.put<AboutData>(`${this.url}/about`, about);
  }
/////////////////////////////// SKILLS ///////////////////////////////////////
  getSkills() {
    return this.http.get<SkillsData[]>(`${this.url}/skills`);
  }

  postSkill(skill: SkillsData){
    return this.http.post<SkillsData>(`${this.url}/skills`, skill);
  }

  deleteSkill(id: SkillsData['id']){
    return this.http.delete<void>(`${this.url}/skills/${id}`);
  }

  updateSkill(skill: SkillsData){
    return this.http.put<SkillsData>(`${this.url}/skills/${skill.id}`, skill);
  }
/////////////////////////////// PROJECTS ///////////////////////////////////////
  getProjects() {
    return this.http.get<ProjectsData[]>(`${this.url}/projects`);
  }

  postProject(project: ProjectsData){
    return this.http.post<ProjectsData>(`${this.url}/projects`, project);
  }

  deleteProject(id: ProjectsData['id']){
    return this.http.delete<void>(`${this.url}/projects/${id}`);
  }

  updateProject(project: ProjectsData){
    return this.http.put<ProjectsData>(`${this.url}/projects/${project.id}`, project);
  }
/////////////////////////////// EDUCATION ///////////////////////////////////////
  getEducation() {
    return this.http.get<EducationData[]>(`${this.url}/education`);
  }

  postEducation(education: EducationData){
    return this.http.post<EducationData>(`${this.url}/education`, education);
  }

  deleteEducation(id: EducationData['id']){
    return this.http.delete<void>(`${this.url}/education/${id}`);
  }

  updateEducation(education: EducationData){
    return this.http.put<EducationData>(`${this.url}/education/${education.id}`, education);
  }
}
