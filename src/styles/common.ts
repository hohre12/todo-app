import styled from "styled-components";

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 80px);
  .loading {
    width: 48px;
    height: 48px;
    border: 5px solid #eee;
    border-bottom-color: #ff3d00;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
`;