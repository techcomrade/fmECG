import React, { useCallback, useState, useEffect } from 'react';
import { FormGroup, FormMessage, Label } from '@adminjs/design-system';
import { Editor } from '@tinymce/tinymce-react';

const UploadNewsImage = (props) => {
  const { property, record, onChange } = props;
  const value = record.params?.[property.path];
  const error = record.errors && record.errors[property.path];

  const handleUpdate = useCallback(
    (content) => {
      onChange(property.path, content);
    },
    [onChange, property.path]
  );

  const handleEditorChange = (content, editor) => {
    handleUpdate(content);
  };

  const handleImageUpload = (blobInfo) => {
    const formData = new FormData();
    formData.append('image', blobInfo.blob());
    
    return fetch('/upload/news/image', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
        throw new Error('Image upload failed: ' + error.message);
      });
  };

  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    setIsEditorReady(true);
  }, []);

  const editorValue = typeof value === 'string' ? value : '';

  return (
    <FormGroup error={Boolean(error)}>
      <Label htmlFor={property.path} required={true}>
        {property.label}
      </Label>
      {isEditorReady && (
        <Editor
          key={property.path}
          apiKey="n7nq4gqye1xzif2wjbh0xm8t86k3y55y6x0z57qgd9nt6rv1"
          value={editorValue}
          onEditorChange={handleEditorChange}
          init={{
            height: 200,
            menubar: false,
            plugins: 'image',
            toolbar: 'image',
            forced_root_block: 'figure', // Only allow inserting images as a figure element
            force_br_newlines: true, // Ensure line breaks after images
            images_upload_url: '/upload', // Optional: If you have a separate endpoint for image uploads
            images_upload_handler: handleImageUpload,
          }}
        />
      )}
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  );
};

export default UploadNewsImage;
