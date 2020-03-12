import React, {useEffect} from "react";
import styled from "styled-components";
import '../../static/quill.snow.css';
import ReactQuill from "react-quill";
import { Main, Container, Footer, Author, BoardHead, BoardInfo,
  BoardTitleInput, CancelBtn, CheckBoxes, CreatedAt, Detail, Form, GoListBtn, Header, LeftForm, LeftFormInput, LeftFormTitle
  , MobileCancelBtn, MobileMenus, MobileRegisterBtn, P, Phone, Place, RegisterBtn, StateSelect, Title, Wysiwyg } from "./LostItemRegister"

export default function LostItemRevise(
  {
    createdAt,
    specificData,
    type,
    setType,
    phoneFlag,
    setPhoneFlag,
    setTitle,
    setDate,
    setPlace,
    editorRef,
    content,
    onChangeContent,
    history,
    revise,
    setPhoneNumber,
    modules,
    imageUpload
  }
) {
  useEffect(() => {
    editorRef.current.editor.getModule("toolbar").addHandler('image', imageUpload);
  }, [editorRef]);

  return (
    <Main>
      <Container>
        <Header>
          <Title>분실물</Title>
          <GoListBtn>목록으로</GoListBtn>
        </Header>
        <Form>
          <BoardHead>
            <BoardTitleInput
              type="text"
              defaultValue={specificData.title}
              onInput={e => setTitle(e.target.value)}/>
            <BoardInfo>
              <Author>{specificData.nickname}</Author>
              <CreatedAt>{createdAt}</CreatedAt>
            </BoardInfo>
          </BoardHead>
          <StateSelect>
            <p>상태 변경</p>
            {type === 0 &&
            <CheckBoxes>
              <input
                type="radio"
                defaultChecked={type === 0}/>
              <label onClick={() => setType(0)}>분실물 습득</label>
              <input
                type="radio"
                defaultChecked={type === 1}/>
              <label onClick={() => setType(1)}>분실물 찾기</label>
            </CheckBoxes>
            }
            {type === 1 &&
            <CheckBoxes>
              <input
                type="radio"
                defaultChecked={type === 0}/>
              <label onClick={() => setType(0)}>분실물 습득</label>
              <input
                type="radio"
                defaultChecked={type === 1}/>
              <label onClick={() => setType(1)}>분실물 찾기</label>
            </CheckBoxes>
            }
          </StateSelect>
          <LeftForm>
            {/*Date*/}
            <LeftFormTitle>
              <p>
                {type === 0 &&
                <span>습득일</span>
                }
                {type === 1 &&
                <span>분실일</span>
                }
              </p>
              <LeftFormInput
                type="date"
                defaultValue={specificData.date}
                onInput={e => setDate(e.target.value)}/>
            </LeftFormTitle>

            {/*Place*/}
            <Place>
              <p>
                {type === 0 &&
                <span>습득 장소</span>
                }
                {type === 1 &&
                <span>분실 장소</span>
                }
              </p>
              <LeftFormInput
                placeholder={type ? "분실장소를 입력해주세요" : "습득장소를 입력해주세요"}
                defaultValue={specificData.location}
                onInput={e => setPlace(e.target.value)}/>
            </Place>

            {/*Phone*/}
            <Phone>
              <span>연락처</span>
              {phoneFlag === false &&
              <CheckBoxes phone>
                <input
                  type="radio"
                  defaultChecked={phoneFlag}
                />
                <label onClick={() => setPhoneFlag(true)}>공개</label>
                <input
                  type="radio"
                  defaultChecked={!phoneFlag}
                />
                <label onClick={() => setPhoneFlag(false)}>비공개</label>
              </CheckBoxes>
              }
              {phoneFlag === true &&
              <CheckBoxes phone>
                <input
                  type="radio"
                  defaultChecked={phoneFlag}
                />
                <label onClick={() => setPhoneFlag(true)}>공개</label>
                <input
                  type="radio"
                  defaultChecked={!phoneFlag}
                />
                <label onClick={() => setPhoneFlag(false)}>비공개</label>
              </CheckBoxes>
              }
              <LeftFormInput
                type="text"
                disabled={!phoneFlag}
                defaultValue={phoneFlag ? specificData.phone : ''}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="ex)010-1234-1234"/>
            </Phone>
          </LeftForm>
        </Form>
        <Detail>
          <P>상세정보 입력</P>
          <Wysiwyg>
            {/*<input type="text" name="contents" id="contents" hidden/>*/}
            <ReactQuill
              ref={editorRef}
              modules={modules}
              value={content}
              onChange={content => onChangeContent(content)}
              style={{ height: '400px' }}
            />
          </Wysiwyg>
        </Detail>
        <Footer>
          <CancelBtn onClick={()=> history.push('/lost')}>취소</CancelBtn>
          <RegisterBtn onClick={() => revise()}>수정</RegisterBtn>
          <GoListBtn onClick={()=> history.push('/lost')}>목록으로</GoListBtn>
        </Footer>
        <MobileMenus>
          <MobileCancelBtn onClick={()=> history.push('/lost')}>
            취소
          </MobileCancelBtn>
          <MobileRegisterBtn onClick={()=> revise()}>
            수정
          </MobileRegisterBtn>
        </MobileMenus>
      </Container>
    </Main>
  )
}
