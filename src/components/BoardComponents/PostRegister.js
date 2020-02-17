import React, { useEffect } from 'react'
import styled, { css } from 'styled-components';
import ReactQuill from 'react-quill';
import '../../static/quill.snow.css';

const PostHead = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  width: 834px;
  height: 100%;
  text-align: left;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;

  @media (max-width: 576px) {
    display: none;
  }
`;

const PostTitle = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  letter-spacing: -1px;
  color: #252525;
  width: 100%;
  word-wrap: break-word;
`;

const TitleInputField = styled.input`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  letter-spacing: -1px;
  color: #252525;
  padding-top: 26px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 7px;
  width: 794px;
  border: 0px white solid;
  word-wrap: break-word;

  &::placeholder {
    color: #bec9d5;
  }
`;

const TempInfoInputField = styled.input`
  border: none;
  margin-right: 20px;
  font-size: 13px;
  width: 120px;
  position: relative;
  bottom: 2px;

  &::placeholder {
    color: #bec9d5;
  }
`;

const PostInfo = styled.div`
  display: flex;
  padding-bottom: 27px;
  padding-left: 20px;
  padding-right: 20px;
`;

const PostAuthor = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 16px;
`;

const PostCreatedAt = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  letter-spacing: -0.7px;
  color: #858585;
`;

const PostBody = styled.div`
  text-align: left;
  padding: 22px 20px 25px 20px;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  height: 450px;
  min-height: 230px;
  overflow: scroll;
  -ms-overflow-style: none;
  user-select: text;
  padding-top: 15px;
  border-bottom: 1px solid #175c8e;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 576px) {
    height: 550px;
    padding: 0;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.7px;
    color: #252525;
    min-height: 500px;
    border: none;
  }
`;

const PostFooter = styled.div`
  margin-top: 20px;
  position: relative;

  @media (max-width: 576px) {
    display: none;
  }
`;

const ButtonStyle = css`
  padding: 6px 25px;
  margin: 0 6px;
  color: white;
  font-size: 13px;
  cursor: pointer;
`;
const CancelButton = styled.button`
  ${ButtonStyle}
  background-color: #909090;
  border: 1px solid #909090;
`;

const RegisterButton = styled.button`
  ${ButtonStyle}
  background: #175c8e;
  border: 1px solid #175c8e;
`;

const MobilePostHead = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
  }
`;

const MobileInputField = styled.input`
  font-family: NanumBarunGothic, serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  letter-spacing: -0.8px;
  text-align: left;
  color: #252525;
  padding: 15px 16px 17.5px 16px;
  width: calc(100% - 32px);
  border: none;
  border-bottom: 1px solid #ececec;
  word-wrap: break-word;

  &::placeholder {
    color: #bec9d5;
  }
`;

const MobileButtonStyle = css`
  top: 0;
  height: 56px;
  position: absolute;
  background-color: #175c8e;
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.36;
  letter-spacing: -0.7px;
  padding: 16px;
  border: none;
`;

const MobileCancelButton = styled.button`
  ${MobileButtonStyle}
  left: 0;

`;

const MobileRegisterButton = styled.button`
  ${MobileButtonStyle}
  right: 0;
`;

export default function PostRegister({
  children,
  post,
  nickname,
  editorRef,
  modules,
  tempInfo,
  imageUpload,
  onChangeTempInfo,
  onClickRegisterButton,
  onClickCancelButton,
  onChangeTitle,
  onChangeContent,
  computedOnlyDateByDateType
}) {
  
  useEffect(() => {
    editorRef.current.editor.getModule("toolbar").addHandler('image', imageUpload);
  }, [editorRef])

  return (
    <>
      <PostHead>
        <PostTitle>
          <TitleInputField
            type="text"
            value={post.title}
            placeholder="제목을 입력해주세요."
            onChange={onChangeTitle} />
        </PostTitle>
        <PostInfo>
          {parseInt(sessionStorage.getItem("boardId")) !== -1 
            ? <PostAuthor>{nickname}</PostAuthor>
            : (
              <>
                <TempInfoInputField
                  type="text"
                  name="nickname"
                  value={tempInfo.nickname}
                  onChange={onChangeTempInfo}
                  placeholder="닉네임을 입력하세요."
                />
                <TempInfoInputField
                  type="password"
                  name="password"
                  value={tempInfo.password}
                  onChange={onChangeTempInfo}
                  placeholder="비밀번호를 입력하세요"
                />
              </>
            )
          }
          <PostCreatedAt>{computedOnlyDateByDateType(new Date())}</PostCreatedAt>
        </PostInfo>
      </PostHead>
      <MobilePostHead>
        <MobileCancelButton onClick={onClickCancelButton}>취소</MobileCancelButton>
        <MobileRegisterButton onClick={onClickRegisterButton}>등록</MobileRegisterButton>
        <MobileInputField
          type="text"
          value={post.title}
          placeholder="제목을 입력해주세요."
          onChange={onChangeTitle}
        />
        {parseInt(sessionStorage.getItem("boardId")) === -1 &&
          <>
            <MobileInputField
              type="text"
              name="nickname"
              value={tempInfo.nickname}
              onChange={onChangeTempInfo}
              placeholder="닉네임을 입력하세요."
            />
            <MobileInputField
              type="password"
              name="password"
              value={tempInfo.password}
              onChange={onChangeTempInfo}
              placeholder="비밀번호를 입력하세요"
            />
          </>
        }
      </MobilePostHead>
      <PostBody>
        <ReactQuill
          ref={editorRef}
          value={post.content}
          onChange={content => onChangeContent(content)}
          modules={modules}
          style={{ height: '400px' }}
        />
      </PostBody>
      <PostFooter>
        <CancelButton onClick={onClickCancelButton}>취소</CancelButton>
        <RegisterButton onClick={onClickRegisterButton}>등록</RegisterButton>
        {children}
      </PostFooter>
    </>
  )
}
