import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Comment from '../SharedComponents/Comment'
import parse from 'html-react-parser'

const PromotionHead = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 1px solid #175c8e;
  padding: 26px 20px 26px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #175c8e;
  text-align: left;
  user-select: none;
  
  @media (max-width: 576px) {
    padding: 13px 16px 15px;
    height: 100%;
    border-top: 0;
    border-bottom: 1px solid #ececec;
    display: grid;
    grid: auto 14px auto / 250px 1fr;
    grid-template-areas: "header info"
                         "date info"
                         "buttons buttons";
    grid-auto-flow: column dense;
    grid-row-gap: 13px;
    margin-bottom: 15px;
  }
`;

const PromotionTitle = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 20px;
  letter-spacing: -1px;
  color: #252525;
  padding-bottom: 7px;
  width: 794px;
  word-wrap: break-word;
  grid-area: header;
  
  & span {
    font-size: 15px;
    letter-spacing: -0.8px;
    color: #175c8e;
  }
  
  @media (max-width: 576px) {
    font-size: 16px;
    padding: 0;
    width: auto;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.87);
    letter-spacing: -0.8px;
    line-height: normal;
    word-break: break-all;
  }
`;

const NewTag = styled.img.attrs({
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

const PromotionEndBadge = styled.div`
  display: inline-block;
  padding: 0 5px;
  border-radius: 0;
  color: #252525;
  background-color: #ffffff;
  border: 1px solid #252525;
  font-family: SegoeUI;
  font-size: 11px;
  line-height: 1.36;
`;

const PromotionDateInfo = styled.div`
  padding: 8px 0 14px;
  display: flex;
  font-family: NanumBarunGothic;
  font-size: 14px;
  line-height: 1.14;
  letter-spacing: normal;
  font-weight: normal;
  color: #858585;
  
  & span {
    color: #175c8e;
    font-weight: bold;
    margin-right: 8px;
  }
  
  @media (max-width: 576px) {
    padding: 0;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.08;
    letter-spacing: normal;
    color: #252525;
    
    & span {
      color: #175c8e;
    }
  }
`;

const PromotionPostInfo = styled.div`
  display: flex;
  
  @media (max-width: 576px) {
    padding: 0;
    font-family: NanumSquareR;
    font-size: 10px;
    font-weight: normal;
    line-height: 1.2;
    letter-spacing: -0.7px;
    grid-area: info;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    text-align: right;
    display: grid;
  }
`;

const PromotionAuthor = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #175c8e;
  margin-right: 16px;
  
  & span {
    display: none;
  }
  
  @media (max-width: 576px) {
    margin-right: 0;
    color: #9fa9b3;
    width: 82px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    grid-row: 1 / 2;
     
    & span {
      display: inline-block;
    }
  }
`;

const PromotionCreatedTime = styled.div`
  font-family: NanumBarunGothic, serif;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: -0.7px;
  color: #707070;
  grid-row: 2/3;
  
  & span {
    margin-left: 7px;
  }
  
  @media (max-width: 576px) {
    color: #9fa9b3;
    
    & span {
      display: none;
    }
  }
`;

const PromotionBody = styled.div`
  text-align: left;
  padding: 30px 20px 50px;
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
  scrollbar-width: none;
  user-select: text;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  & img {
    max-width: 796px;
  }
  
  @media (max-width: 576px) {
    padding-top: 20px;
    padding-bottom: 46px;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.71;
    letter-spacing: -0.7px;
    min-height: 400px;
    color: #252525;
  
    & img {
      max-width: 100%;
    }
  }
`;

const PromotionButtonWrapper = styled.div`
  display: none;
  
  @media (max-width: 576px) {
    display: flex;
    justify-content: ${props => props.isMyPost ? 'none' : 'flex-end'};
    margin-top: 12px;
    grid-area: buttons;
  }
`;

const PromotionEditButton = styled(Link)`
  display: block;
  border: 1px solid #a1a1a1;
  width: 51px;
  height: 17px;
  padding: 5px 0;
  font-size: 12px;
  font-weight: normal;
  line-height: 1.75;
  text-decoration: none;
  text-align: center;
  color: #252525;
  margin-right: 10px;
`;

const PromotionRemoveButton = styled.button`
  display: block;
  border: 1px solid #a1a1a1;
  width: 51px;
  height: 29px;
  padding: 5px 0;
  font-size: 12px;
  font-weight: normal;
  text-decoration: none;
  text-align: center;
  color: #ff3030;
  background-color: #ffffff;
  margin-right: auto;
`;

const ListRoutingButton = styled(Link)`
  font-size: 13px;
  letter-spacing: -0.7px;
  padding: 5px 0;
  height: 17px;
  cursor: pointer;
  width: 72px;
  color: white;
  text-align: center;
  line-height: 1.5;
  text-decoration: none;
  background: #175c8e;
  border: 1px solid #175c8e;
`;

const PromotionOrderButton = styled(Link)`
  display: block;
  width: 124px;
  height: 20px;
  padding: 5px 0;
  margin: 0 auto 91px;
  color: #ffffff;
  font-family: SegoeUI;
  font-size: 14px;
  text-align: center;
  line-height: 1.42;
  letter-spacing: -0.6px;
  background-color: #f7941e;
  text-align: center;
  border: 0;
  text-decoration: none;
  
  @media (max-width: 576px) {
    margin-bottom: 58px;
    padding: 10px 0;
    height: 10px;
    width: 159px;
    line-height: 1.09;
    font-family: NanumBarunGothic;
    font-size: 11px;
  }
`;

const PromotionEditorBadge = styled.div`
  display: inline-block;
  border-radius: 8px;
  padding: 0 10px;
  margin-right: 8px;
  font-family: SegoeUI;
  font-size: 11px;
  height: 16px;
  line-height: 1.5;
  color: #ffffff;
  background-color: #f7941e;
  
  &::before {
    content: "점주";
  }
`;


export default function PromotionDetail ({
  history,
  match,
  promotion,
  isMyPost,
  handleDeleteButton,
  registerComment,
  editComment,
  deleteComment,
  checkDisabled,
  children
}) {
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

  const convertDate = (time) => {
    const times = time.split(/[ :-]/g);
    return new Date(times[0], times[1] - 1, times[2], times[3], times[4], times[5]);
  }

  const setDate = (time) => {
    const today = new Date();
    let created = convertDate(time);
    const year = created.getFullYear();
    const month = created.getMonth() + 1 < 10 ? `0${created.getMonth()+1}` : created.getMonth()+1;
    const date = created.getDate() < 10 ? `0${created.getDate()}` : created.getDate();

    if (Math.floor((today - created) / 60 / 1000 / 60) < 4) {
      return [`${String(year)}.${String(month)}.${String(date)}`, true];
    } else {
      return [`${String(year)}.${String(month)}.${String(date)}`, false];
    }
  }

  const removeScriptTag = str => {
    return str.replace(/<(\/script|script|\/style|style|\/!DOCTYPE|\/abbr|\/acronym|\/address|\/applet|\/area|\/article|\/aside|\/audio|\/b|\/base|\/basefont|\/bdi|\/bdo|\/big|\/blockquote|\/body|\/br|\/button|\/canvas|\/caption|\/center|\/cite|\/code|\/col|\/colgroup|\/data|\/datalist|\/dd|\/del|\/details|\/dfn|\/dialog|\/dir|\/div|\/dl|\/dt|\/em|\/embed|\/fieldset|\/figcaption|\/figure|\/font|\/footer|\/form|\/frame|\/frameset|\/h1-|\/h6|\/head|\/header|\/hr|\/html|\/i|\/iframe|\/img|\/input|\/ins|\/kbd|\/label|\/legend|\/li|\/link|\/main|\/map|\/mark|\/meta|\/meter|\/nav|\/noframes|\/noscript|\/object|\/ol|\/optgroup|\/option|\/output|\/p|\/param|\/picture|\/pre|\/progress|\/q|\/rp|\/rt|\/ruby|\/s|\/samp|\/script|\/section|\/select|\/small|\/source|\/span|\/strike|\/strong|\/style|\/sub|\/summary|\/sup|\/svg|\/table|\/tbody|\/td|\/template|\/textarea|\/tfoot|\/th|\/thead|\/time|\/title|\/tr|\/track|\/tt|\/u|\/ul|\/var|\/video|\/wbr|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdi|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frame|frameset|h1-|h6|head|header|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|main|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strike|strong|style|sub|summary|sup|svg|table|tbody|td|template|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video|wbr)([^>]*)>/gi, "");
  }

  const convertCleanString = str => {
    return convertTitle(removeScriptTag(str));
  }

  return (
    <>
      {promotion && (Number(match.params.id) === promotion.id) && (
        <>
          <PromotionHead>
            <PromotionTitle>
              {convertCleanString(promotion.title)}
              <span> [{promotion.comment_count}]</span>
              {checkDisabled(promotion.end_date) && <PromotionEndBadge>마감</PromotionEndBadge>}
              {setDate(promotion.created_at)[1] &&
                <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"} />
              }
            </PromotionTitle>
            <PromotionDateInfo><span>행사 기간 :</span>{promotion.start_date.replace(/-/g, '.')} ~ {promotion.end_date.replace(/-/g, '.')}</PromotionDateInfo>
            <PromotionPostInfo>
              <PromotionAuthor><span>조회 {promotion.hit} · </span> {promotion.nickname}</PromotionAuthor>
              <PromotionCreatedTime>{promotion.created_at.replace(/-/g, '.').slice(0, 10)} <span>{promotion.created_at.split(" ")[1]}</span></PromotionCreatedTime>
            </PromotionPostInfo>
            <PromotionButtonWrapper isMyPost={isMyPost}>
              {isMyPost && 
                (
                  <>
                    <PromotionEditButton to="/board/promotion/edit">수정</PromotionEditButton>
                    <PromotionRemoveButton onClick={handleDeleteButton}>삭제</PromotionRemoveButton>
                  </>
                )
              }
              <ListRoutingButton to="/board/promotion">목록으로</ListRoutingButton>
            </PromotionButtonWrapper>
          </PromotionHead>
          <PromotionBody>
            {parse(promotion.content)}
          </PromotionBody>
          <PromotionOrderButton to={`/store/${promotion.shop_id}`}>주문하러 가기</PromotionOrderButton>
          <Comment
            history={history}
            // 게시글 정보
            specificData={promotion}

            // dispatch를 발생시키는 댓글 관련 함수들
            registerComment={registerComment}
            editComment={editComment}
            deleteComment={deleteComment}

            // 원문 바로가기
            originalLink={null}
            EditorBadge={PromotionEditorBadge}/>
        </>
      )}
    </>
  )

}