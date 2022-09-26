import styled, {css} from "styled-components";

const dragActive = css`
  border-color: #78e5d5;
`;

const dragReject = css`
  border-color:  #e57878;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 30px;
  background: #FFF;
  border-radius: 4px;
  padding: 24px;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone"
})`
  border: 1px dashed black;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive == true && dragActive};  
  ${props => props.isDragReject == true && dragReject};  
`;

export const UploadMessage = styled.p``;