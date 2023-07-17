import React, { useCallback, useState, useEffect } from 'react';
import { FormGroup, FormMessage, Label } from '@adminjs/design-system';
import { Editor } from '@tinymce/tinymce-react';

const NewsContentInput = (props) => {
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
            height: 500,
            menubar: true,
            images_upload_url: '/upload',
            images_upload_handler: handleImageUpload,
            images_reuse_filename: true,

            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      )}
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  );
};

export default NewsContentInput;

