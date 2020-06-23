import React from 'react';

function ImageUpload(props) {
  return (
    <div className="image-upload">
      <label for={props.id}>
        <input type="file" id={props.id} name={props.name} accept="image/*" />
      </label>
    </div>
  );
}

export default ImageUpload;
