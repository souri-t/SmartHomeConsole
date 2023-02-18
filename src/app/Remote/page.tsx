"use client";

import React, { use, useEffect, useState } from "react";

type CommonValue = {
    id: number
    name: string
};

type Log = {
    date: Date,
    applience: string,
    command: string,
    result : string
}


export default function Remote() {
    const [appliances, setAppliances] = useState<CommonValue[]>([]);
    const [commands, setCommands] = useState<CommonValue[]>([]);
    const [applianceId, setApplianceId] = useState<string>("");
    const [commandId, setCommandId] = useState<string>("");
    const [logs, setLog] = useState<Log[]>([]);
    const addLogs = (log: Log) => {
        setLog([...logs, log])
    }

    useEffect(() => {
        const fetchData = async () => {
            const responce = await fetch('https://smarthome-server.hasura.app/api/rest/remote/appliances');
            setAppliances((await responce.json()).appliances);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (!applianceId) return;
            const responce = await fetch(`https://smarthome-server.hasura.app/api/rest/remote/appliances/${applianceId}/commands`);
            setCommands((await responce.json()).remote_commands);
        };
        fetchData();
    }, [applianceId]);

    async function onClickButton() {
        console.log(commandId);
        addLogs({applience : "a", command : "c"} as Log)
    }

    return (
        <main>
            <div id="content" style={{ padding:"10px;"}} className="table-responsive">
                <h1>IR Console</h1>
                <h3>Send</h3>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="">
                            <label className="control-label col-xs-2"><b>IR FileName:</b></label>
                            <div className="col-xs-5">
                                <select className="form-control input-sm" onChange={(e) => setApplianceId(e.target.value)}>
                                    <option value="">-</option>
                                    {appliances.map((appliance) => (
                                        <option key={appliance.id} value={appliance.id}>{appliance.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="">
                            <label className="control-label col-xs-2"><b>IR Command:</b></label>
                            <div className="col-xs-5">
                                <select className="form-control input-sm" onChange={(e) => setCommandId(e.target.value)}>
                                <option value="">-</option>
                                    {commands.map((command) => (
                                        <option key={command.id} value={command.id}>{command.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="">
                            <label className="control-label col-xs-2"><b>Control:</b></label>
                            <div className="col-xs-5">
                                <button className="btn btn-success btn-sm" onClick={() => onClickButton()}>execute</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Log</h3>
            <table className="table table-striped table-sm table-hover table-responsive table-bordered" id='logtable'>
                <thead className="thead-light table-hover">
                    <tr>
                        <th align="left"><b>Date</b></th>
                        <th align="left"><b>FileName</b></th>
                        <th align="left"><b>Command</b></th>
                        <th align="left"><b>Result</b></th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr>
                            <td><div id="date"></div></td>
                            <td><div id="sendedfilename">{log.applience}</div></td>
                            <td><div id="sendedcommand">{log.command}</div></td>
                            <td><div id="result"></div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
