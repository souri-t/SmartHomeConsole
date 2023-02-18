"use client";

import React, { use, useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
}

function ProjectList() {
  const [accessToken, setAccessToken] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);

  const handleAccessTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccessToken(event.target.value);
  };
  const handleGetProjectsClick = async () => {
      try {
        // const response = await fetch('https://my.redmine.jp/demo/projects.json?key=41edc86875a8f0043c268a5425123471257fede3')

        // const response2 = await fetch('https://my.redmine.jp/demo/projects.json', {
            // const response = await fetch('https://my.redmine.jp/demo/projects.json?key=41edc86875a8f0043c268a5425123471257fede3', {
        //const response = await fetch('http://localhost:3080/projects.json?key=158670c63d57f6d528b88cd4c9f0d2690e4d9200');

        const response = await fetch('http://localhost:3080/projects.json?key=158670c63d57f6d528b88cd4c9f0d2690e4d9200', {
            headers: {
                // 'X-Redmine-API-Key': accessToken
                'Access-Control-Allow-Origin' : '*'
            }
            // credentials: "include",
            // mode: 'cors'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log(data);
      setProjects(data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Access Token:
          <input type="text" value={accessToken} onChange={handleAccessTokenChange} />
        </label>
        <button onClick={handleGetProjectsClick}>Get Projects</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;
