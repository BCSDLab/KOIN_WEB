import React from "react";
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import Comment from "../SharedComponents/Comment";
import parse from "html-react-parser"

const Main = styled.div`
  width: 100%;
`;

const Container = styled.div`
  margin-top: 61px;
  width: 1132px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 576px) {
    width: 100%;
    margin-top: 0;
  }
`;

const ItemDetail = styled.div`
  width: 100%;
  float: left;
  margin-right: 40px;
  margin-bottom: 60px;
  
  @media (max-width: 576px) {
    width: inherit;
    margin: 0;
  }
`;

const HeadTitle = styled.h1`
  float: left;
  font-size: 30px;
  letter-spacing: -1.5px;
  font-weight: 800;
  color: #175c8e;
  font-family: "NanumSquare", serif;
  margin: 0 0 20px 0;
  cursor: pointer;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const Header = styled.header`
  width: 100%;
  height: 55px;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const WriteBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: white;
  background-color: #175c8e;
  font-size: 13px;
  cursor: pointer;
  border: 1px solid #175c8e;
  margin-top: 1px;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const DeleteBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: #d32525;
  background: white;
  border: 1px #d32525 solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const ReviseBtn = styled.button`
  float: right;
  padding: 6px 13px;
  color: #175c8e;
  background: white;
  border: 1px #175c8e solid;
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  margin-top: 1px;
`;

const BorderHead = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  width: 1132px;
  height: 100%;
  text-align: left;
  user-select: text;
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const BoardTitle = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -1px;
  color: #252525;
  padding: 26px 20px 7px 20px;
  width: 794px;
  word-wrap: break-word;
`;

const CommentCount = styled.span`
  font-size: 15px;
  letter-spacing: -0.8px;
  color: #175c8e;
`;

const N = styled.img.attrs({
  src: "https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"
})`
  position: relative;
  margin-right: 12px;
  bottom: 1px;
  user-select: none;
  width: 13.5px;
  height: 14px;
  margin-left: 11px;
  top: 0;
`;

const BoardInfo = styled.div`
  display: flex;
  padding-bottom: 27px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Author = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 16px;
`;

const CreatedAt = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #858585;
  
  span {
    margin-right: 7px;
  }
`;

const MobileBoardHead = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    text-align: left;
    padding: 15px 16px;
    height: 100%;
    border-bottom: 1px solid #ececec;
  }
`;

const MobilePostTitle = styled.div`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
  letter-spacing: -0.8px;
  line-height: 1.5;
  word-break: break-all;
`;

const MobilePostInfo = styled.div`
  margin-top: 1px;
  color: #a1a1a1;
  font-size: 13px;
  line-height: 1.54;
  letter-spacing: -0.7px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span:first-child {
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MobileButtonGroup = styled.div`
  margin-top: 22px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  font-size: 12px;
  padding: 6px 13px;
  background: #ffffff;
  color: #175c8e;
  border: 1px solid #175c8e;
  margin-right: 4px;
`;

const DeleteButton = styled.button`
  font-size: 12px;
  padding: 6px 13px;
  background: #ffffff;
  color: #d32525;
  border: 1px solid #d32525;
`;


const ItemInfo = styled.div`
  text-align: left;
  padding: 36px 19px 0 19px;
  
  table tbody tr td:first-child {
    font-size: 15px;
    font-weight: bold;
    line-height: 1.73;
    letter-spacing: -0.8px;
    color: #555555;
    padding-right: 33px;
  }

  table tbody tr td:nth-child(2) {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.73;
    letter-spacing: -0.8px;
    color: #555555;
  }
  
  @media (max-width: 576px) {
    padding: 15px 16px 0 16px;
    
    table tr:first-child {
      display: none;
    }
    
    table tbody tr td:first-child {
      width: 92px;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
    
    table tbody tr td:nth-child(2) {
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.8px;
      color: #252525;
    }
  }
`;

const BoardContent = styled.div`
  text-align: left;
  padding-left: 19px;
  padding-right: 19px;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  height: 100%;
  min-height: 230px;
  overflow: scroll;
  -ms-overflow-style: none;
  user-select: text;
  padding-top: 15px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media(max-width: 576px){
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: -0.7px;
    min-height: 400px;
    color: #252525;
  }
`;

const MobileTopnavBtn = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: block;
    z-index: 25;
  }
  
  img {
    width: 24px;
    height: 24px;
    background-color: #175c8e;
  }
`;

const MobileBackBtn = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/back-menu.png"
})`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const MobileRegisterBtn = styled.img.attrs({
  src: "https://static.koreatech.in/assets/img/mobile__create.png"
})`
  position: absolute;
  top: 16px;
  right: 16px;
`;


export default function LostItemDetail(
  {
    history,
    specificData,
    newFlag,
    adjustComment,
    deleteComment,
    registerComment,
    deleteItem,
    reviseItem
  }
) {

  const removeScriptTag = str => {
    return str.replace(/<(\/script|script|\/style|style|\/!DOCTYPE|\/abbr|\/acronym|\/address|\/applet|\/area|\/article|\/aside|\/audio|\/b|\/base|\/basefont|\/bdi|\/bdo|\/big|\/blockquote|\/body|\/br|\/button|\/canvas|\/caption|\/center|\/cite|\/code|\/col|\/colgroup|\/data|\/datalist|\/dd|\/del|\/details|\/dfn|\/dialog|\/dir|\/div|\/dl|\/dt|\/em|\/embed|\/fieldset|\/figcaption|\/figure|\/font|\/footer|\/form|\/frame|\/frameset|\/h1-|\/h6|\/head|\/header|\/hr|\/html|\/i|\/iframe|\/img|\/input|\/ins|\/kbd|\/label|\/legend|\/li|\/link|\/main|\/map|\/mark|\/meta|\/meter|\/nav|\/noframes|\/noscript|\/object|\/ol|\/optgroup|\/option|\/output|\/p|\/param|\/picture|\/pre|\/progress|\/q|\/rp|\/rt|\/ruby|\/s|\/samp|\/script|\/section|\/select|\/small|\/source|\/span|\/strike|\/strong|\/style|\/sub|\/summary|\/sup|\/svg|\/table|\/tbody|\/td|\/template|\/textarea|\/tfoot|\/th|\/thead|\/time|\/title|\/tr|\/track|\/tt|\/u|\/ul|\/var|\/video|\/wbr|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1-|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|svg|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)([^>]*)>/gi, "");
  }

  const convertCleanString = str => {
    return convertTitle(removeScriptTag(str));
  }

  const convertTitle = (string) => {
    const entityMap = {
      "'": "&apos;",
      "<": "&lt;",
      ">": "&gt;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ƒ": "&fnof;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&Upsih;",
      "ϖ": "&piv;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "•": "&bull;",
      "…": "&hellip;",
      "‰": "&permil;",
      "′": "&prime;",
      "″": "&Prime;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "€": "&euro;",
      "ℑ": "&image;",
      "℘": "&weierp;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&UArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "⟨": "&lang;",
      "⟩": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    }
    for (let key in entityMap) {
      let entity = entityMap[key];
      let regex = new RegExp(entity, 'g');
      string = string.replace(regex, key);
    }
    return string.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  }

  function dateToString(date) {
    return date.slice(0, 10).replace('-', '.').replace('-', '.')
  }

  return (
    <Main>
      <Container>
        <ItemDetail>
          <Header>
            <HeadTitle>
              분실물
            </HeadTitle>
            <Link to={'/lost'}>
              <WriteBtn>
                목록으로
              </WriteBtn>
            </Link>
            {specificData.user_id === (sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("userInfo")).id : "") &&
            <>
              <DeleteBtn onClick={deleteItem}>
                삭제
              </DeleteBtn>
              <ReviseBtn onClick={reviseItem}>
                수정
              </ReviseBtn>
            </>
            }
          </Header>
          <BorderHead>
            <BoardTitle>
              {specificData.title}
              <CommentCount> [{specificData.comment_count}]</CommentCount>
              {newFlag === true &&
              <N/>
              }
            </BoardTitle>
            <BoardInfo>
              <Author>
                {specificData.nickname}
              </Author>
              <CreatedAt>
                <span>{dateToString(String(specificData.created_at))} </span>
                <span>{String(specificData.created_at).slice(10, 19)}</span>
              </CreatedAt>
            </BoardInfo>
          </BorderHead>

          <MobileBoardHead>
            <MobilePostTitle>
              <span>{convertCleanString(specificData.title)}</span>
              <span style={{ color: "#175c8e" }}>({specificData.comment_count})</span>
            </MobilePostTitle>
            <MobilePostInfo>
              <span>조회 {specificData.hit} · {specificData.nickname}</span>
              <span style={{ float: 'right' }}>{dateToString(String(specificData.created_at))}</span>
            </MobilePostInfo>
            {specificData.user_id === (sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("userInfo")).id : "") &&
            <MobileButtonGroup>
              <EditButton onClick={reviseItem}>수정</EditButton>
              <DeleteButton onClick={deleteItem}>삭제</DeleteButton>
            </MobileButtonGroup>
            }
          </MobileBoardHead>

          <ItemInfo>
            <table>
              <tbody>
              <tr>
                <td>분류</td>
                <td>{specificData.type === 0 ? '분실물 습득' : '분실물 찾기'}</td>
              </tr>
              <tr>
                <td>{specificData.type === 0 ? '습득일' : '분실일'}</td>
                <td>{specificData.date}</td>
              </tr>
              <tr>
                <td>{specificData.type === 0 ? '습득장소' : '분실장소'}</td>
                <td>{specificData.location}</td>
              </tr>
              <tr>
                <td>연락처</td>
                <td>{specificData.phone}</td>
              </tr>
              </tbody>
            </table>
          </ItemInfo>
          <BoardContent>
            <div>
              {parse(specificData.content)}
            </div>
          </BoardContent>
          <Comment
            history={history}
            specificData={specificData}
            editComment={adjustComment}
            registerComment={registerComment}
            deleteComment={deleteComment}
            />
          <Link to={'/lost'}>
            <WriteBtn>
              목록으로
            </WriteBtn>
          </Link>
          <MobileTopnavBtn>
            <MobileBackBtn onClick={()=> history.push('/lost')}/>
            {specificData.user_id === (sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("userInfo")).id : "") &&
              <MobileRegisterBtn onClick={() => history.push('/lost/edit')}/>
            }
          </MobileTopnavBtn>
        </ItemDetail>
      </Container>
    </Main>
  )
}
