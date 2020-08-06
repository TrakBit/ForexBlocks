import {
    initializeBlock,
    useBase,
    useRecords,
    useLoadable,
    useWatchable,
    Text,
    Icon,
    colors,
    Button,
    Input
} from '@airtable/blocks/ui';
import React, {useState} from 'react';
import {cursor} from '@airtable/blocks'

function HelloWorldBlock() {

    const [cellValue, setCellValue] = useState('')
    const [cellValuesByFieldName, setCellValuesByFieldName] = useState({
        name: '',
        Email: '',
        Company: '',
        emailBody: 'Hey'
    });

    useLoadable(cursor)

    const base = useBase()
    const table = base.getTableByName('customers')
    const records = useRecords(table)

    useWatchable(cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {
        if (cursor.selectedRecordIds.length > 0) {
            const selectedId = records.find((value) => {
                if (cursor.selectedRecordIds[0] === value._id) {
                    return value
                }
            })

            const newCellValuesByFieldName = {};

            if (selectedId) {
                console.log(table.fields)
                for (const field of table.fields) {
                    newCellValuesByFieldName[field.name] = selectedId.getCellValue(field);
                }
            }

            setCellValuesByFieldName(newCellValuesByFieldName);
            setCellValue(selectedId.getCellValueAsString(cursor.selectedFieldIds))
        }
    })

    return (
        <div>
            
            <div style={{marginTop: '5%'}}>
                <div style={{margin: '0 auto', width: '100px', height: '100px', backgroundColor: '#eeeeee'}}>
                    <Icon style={{marginLeft: '40%', marginTop: '40%'}} name="personal" size={16} />
                </div>

                <div style={{width: '200px', height: '200px', margin: '0 auto'}}>
                    <Text style={{textAlign: 'center'}}>{cellValuesByFieldName.Name}</Text>
                    <Text style={{marginTop: '10px', textAlign: 'center'}}>{cellValuesByFieldName.Email}</Text>

                    <div style={{marginTop: '10px'}}>
                        <textarea id="w3review" name="w3review" rows="4" cols="25">
                            {cellValuesByFieldName.emailBody}
                        </textarea>
                    </div>

                    <div style={{marginTop: '10px'}}>
                        <Button
                                onClick={() => console.log("Button clicked")}
                                variant="primary"
                                icon="envelope"
                                style={{marginLeft: '33%'}}
                            >
                                Mail
                        </Button>
                    </div>
                </div>     

            </div>
        </div>
    )
}

initializeBlock(() => <HelloWorldBlock />);