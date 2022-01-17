import { Text } from "@mantine/core";
import { Dropzone, DropzoneProps, MIME_TYPES } from '@mantine/dropzone';
import { useState } from 'react';

export interface ImporterDropzoneProps extends Omit<DropzoneProps, 'children'> {
  loading: boolean;
  afterParse?: JSX.Element;
}

export function ImporterDropzone({ loading, afterParse, onDrop, onReject }: ImporterDropzoneProps) {

  return (
    <Dropzone
      style={{ margin: '1rem 0' }}
      loading={loading}
      onDrop={onDrop}
      onReject={onReject}
      accept={[MIME_TYPES.csv]}
    >
      {() => (
        <>
          {!afterParse ? (
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed 5mb
              </Text>
            </div>
          ) : (
            <div>
              {afterParse}
            </div>
          )}
        </>
      )}
    </Dropzone>
  )
}
