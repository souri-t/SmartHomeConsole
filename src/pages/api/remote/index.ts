import { NextApiRequest, NextApiResponse } from "next";

const appliances = [
    {id: 1, name: 'remote1'},
    {id: 2, name: 'remote2'},
    {id: 3, name: 'remote3'},
  ];

  
export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const apiResponce = await fetch('https://smarthome-server.hasura.app/api/rest/remote/appliances');
    // console.log(todos.length);

    res.status(200).json(appliances);
}