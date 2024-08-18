import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import MyDocument from './components/doc';

export const convertToStream = async ({name, email, message}) => {
    const pdfStream = await ReactPDF.renderToStream(<MyDocument name={name} email={email} message={message}/>);
    return pdfStream;
}

export const convertToBuffer = async ({name, email, message}) => {
    const buf = await ReactPDF.renderToString(<MyDocument name={name} email={email} message={message}/>);
    return buf;
}