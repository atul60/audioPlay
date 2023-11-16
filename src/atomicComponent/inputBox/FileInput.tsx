import React, { useState } from 'react';
import './fileInput.css';

interface IFileInput {
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string | null | undefined ;
}


const FileInput: any = ({onchange, fileName}: IFileInput) => {

  return (
    <div className="file-input-container">
      <label className="custom-file-input-label">
        Select an audio file
        <input type="file" accept="audio/*" onChange={onchange} />
      </label>
        {fileName && <div className="selected-file-name">{fileName}</div>}
    </div>
  );
};

export default FileInput;
