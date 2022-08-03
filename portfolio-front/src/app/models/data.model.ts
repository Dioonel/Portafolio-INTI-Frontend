export interface MyData {
  "header-data":    HeaderData;
  "about-data":     AboutData;
  "skills-data":    SkillsData[];
  "projects-data":  ProjectsData[];
  "education-data": EducationData[];
}

export interface AboutData {
  spanish: string;
  english: string;
}

export interface EducationData {
  id: number;
  title: string;
  date:  string;
  icon:  string;
}

export interface HeaderData {
  name:     string;
  country:  string;
  position: string;
  banner:   string;
  pp:       string;
}

export interface ProjectsData {
  id: number;
  name:        string;
  description: string;
  icon:        string;
  link:        string;
}

export interface SkillsData {
  id: number;
  skill: string;
  value: number;
}

export interface UpdateAboutData extends Partial<AboutData> { }
