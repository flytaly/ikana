import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from '../styled/kana-table';
import { katakanaRows, kanaTypes } from '../../data/katakana';
import { useGlobalState, useDispatch, types } from '../state';
import { TablesContainer, TableInColumn } from '../styled/kana-tables-grid';
import ContentHeader from './content-header';

const Katakana = () => {
    const katakana = useGlobalState('katakana');
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const makeClickHandler = (kanaType) => ({ rowIdx }) => {
        dispatch({ type: types.KATAKANA_TOGGLE_ROW, payload: { rowIdx, kanaType } });
    };
    const makeSelectAllHandler = (kanaType) => () => {
        dispatch({ type: types.KATAKANA_TOGGLE_ALL, payload: { kanaType } });
    };

    return (
        <>
            <ContentHeader>{t('katakana.pageHeader')}</ContentHeader>
            <TablesContainer>
                <Table
                    data={katakanaRows.monographs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.monographs)}
                    onRowClick={makeClickHandler(kanaTypes.monographs)}
                    tableHeader={t('kanaTable.monographs')}
                    selectedRows={katakana.selectedRows.monographs}
                    withCheckbox
                />
                <TableInColumn>
                    <Table
                        data={katakanaRows.diacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.diacritics)}
                        onRowClick={makeClickHandler(kanaTypes.diacritics)}
                        tableHeader={t('kanaTable.diacritics')}
                        selectedRows={katakana.selectedRows.diacritics}
                        withCheckbox
                    />
                    <Table
                        data={katakanaRows.digraphsDiacritics}
                        onSelectAll={makeSelectAllHandler(kanaTypes.digraphsDiacritics)}
                        onRowClick={makeClickHandler(kanaTypes.digraphsDiacritics)}
                        tableHeader={t('kanaTable.digraphsDiacritics')}
                        selectedRows={katakana.selectedRows.digraphsDiacritics}
                        withCheckbox
                    />
                </TableInColumn>
                <Table
                    data={katakanaRows.digraphs}
                    onSelectAll={makeSelectAllHandler(kanaTypes.digraphs)}
                    onRowClick={makeClickHandler(kanaTypes.digraphs)}
                    tableHeader={t('kanaTable.digraphs')}
                    selectedRows={katakana.selectedRows.digraphs}
                    withCheckbox
                />

            </TablesContainer>
        </>);
};

export default Katakana;
