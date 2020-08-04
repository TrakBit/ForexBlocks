
import {initializeBlock, useBase, useRecords, useLoadable, useWatchable} from '@airtable/blocks/ui';
import React, {useState} from 'react';
import {cursor} from '@airtable/blocks'

function HelloWorldBlock() {

    const [cellValue, setCellValue] = useState('')

    useLoadable(cursor)

    const base = useBase()
    const table = base.getTableByName('Forex Cards')
    const records = useRecords(table)

    useWatchable(cursor, ['selectedRecordIds', 'selectedFieldIds'], () => {
        if (cursor.selectedRecordIds.length > 0) {
            const selectedId = records.find((value) => {
                if (cursor.selectedRecordIds[0] === value._id) {
                    return value
                }
            })
            setCellValue(selectedId.getCellValueAsString(cursor.selectedFieldIds))
        }
    })

    return (
        <div>
            <div>{cellValue}</div>
        </div>
    )
}

initializeBlock(() => <HelloWorldBlock />);