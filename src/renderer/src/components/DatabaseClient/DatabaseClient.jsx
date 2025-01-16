import './databaseclient.css'

function DatabaseClient() {

    var configOptions = ['Hostname', 'Port', 'Username', 'Password', 'Authentication Database']

    return (
        <div className="database-container">
            <div className='database-box-parent'>
                <div className="box-left">
                    <span id='add-new-connection'>Add New Connection</span>
                    <div>localhost:27017</div>
                </div>
                <div className='box-right'>
                    <div className='connection-configs'>
                        {
                            configOptions.map((item) =>
                                <div className="configs" key={item}>
                                    <span className='config-item'>{item}</span>
                                    <input type='text' size='30' id='config-input'></input>
                                </div>
                            )
                        }
                        <button id='config-button'>Connect</button>
                    </div>
                    <div className="table-namespace-selection">
                        <div className="select-database">
                            <span className='db-select-span'>Database:</span>
                            <select className='select-schema'>
                                {populateDatabases()}
                            </select>
                        </div>
                        <div className="select-table">
                            <span className='db-select-span'>Table:</span>
                            <select className='select-schema'>
                                {populateTables()}
                            </select>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

function populateTables() {
    var list = ['titles', 'events', 'programsssssssssssssssssssssssssssssssssss']

    return (
        list.map((item) =>
            <option className='tbl-db-options' key={item}>{item}</option>
        )
    )
}

function populateDatabases() {

    console.log('databases calling main ipc')
    console.log(window)
    var list = []
    list = window.elec.getDatabases()
    console.log('gettinglist')
    console.log(list)

    return (
        list.map((item) =>
            <option className='tbl-db-options' key={item}>{item}</option>
        )
    )
}

export default DatabaseClient