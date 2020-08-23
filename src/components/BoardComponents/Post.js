import React from 'react'
import styled, { css } from 'styled-components';
import parse from 'html-react-parser';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

const LoaderWrapper = styled.div`
  width: 100%;
  min-height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  padding: 26px 20px 7px;
  width: 794px;
  word-wrap: break-word;
`;

const PostComment = styled.span`
  font-size: 15px;
  letter-spacing: -0.8px;
  color: #175c8e;
  padding-left: 3px;
`;

const NewTag = styled.img`
  width: 13.5px;
  height: 14px;
  position: relative;
  margin-left: 11px;
  top: 0px;
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
  padding: 15px 20px 0 20px;
  font-family: NanumBarunGothic, serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.73;
  letter-spacing: -0.8px;
  color: #555555;
  height: 100%;
  min-height: 230px;
  overflow: scroll;
  -ms-overflow-style: none;
  user-select: text;

  &::-webkit-scrollbar {
    display: none;
  }

  & * {
    margin: 0;
  }

  & img {
    max-width: 100%;
  }

  @media (max-width: 576px) {
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.7px;
    color: #252525;
    min-height: 500px;

    & img {
      width: 100%;
    }
  }
`;

const MobilePostHead = styled.div`
  display: none;
  @media (max-width: 576px) {
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
`;

const MobileButtonGroup = styled.div`
  margin-top: 22px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ButtonStyle = css`
  font-size: 12px;
  padding: 6px 13px;
  background: #ffffff;
`;

const EditButton = styled.button`
  ${ButtonStyle}
  color: #175c8e;
  border: 1px solid #175c8e;
  margin-right: 4px;
`;

const DeleteButton = styled.button`
  ${ButtonStyle}
  color: #d32525;
  border: 1px solid #d32525;
`;

const TempPasswordInputField = styled.input`
  width: 83px;
  font-size: 12px;
  padding: 6.5px 5px;
  border: 1px #a1a1a1 solid;
  margin-right: 4px;
`;

function Post({
  post,
  type,
  history,
  loading,
  isMyPost,
  password,
  onChangePassword,
  onClickEditButton,
  onClickDeleteButton,
  registerComment,
  editComment,
  deleteComment,
}) {
  const convertNoticeTag = (type) => {
    switch(type) {
      case 5:
        return "[일반공지]";
      case 6:
        return "[장학공지]";
      case 7:
        return "[학사공지]";
      case 8:
        return "[취업공지]";
      case 9:
        return "[코인공지]";
      default:
        return '';
    }
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

  const convertDate = (time) => {
    const times = time.split(" ");
    const date = times[0].split("-");
    const tim = times[1].split(":");
    let created = new Date();
    created.setFullYear(date[0]);
    created.setMonth(date[1] - 1);
    created.setDate(date[2]);
    created.setHours(tim[0]);
    created.setMinutes(tim[1]);
    created.setSeconds(tim[2]);
    return created;
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

  const computedOnlyDate = createdAt => {
    createdAt = createdAt.split(" ");
    let date = createdAt[0].replace("-", '.');
    date = date.replace("-", '.')
    return date;
  }

  const computedOnlyTime = createdAt => {
    return createdAt.split(" ")[1];
  }
  return (
    <>
      {loading &&
        <LoaderWrapper>
          <ClipLoader
            color={"#175c8e"}
            size={150}
            loading={loading}
          />
        </LoaderWrapper>
      }
      {post &&
        <div>
          <PostHead>
            <PostTitle>
              <span style={{ fontWeight: '600' }}>{convertNoticeTag(post.board_id)}</span>
              <span>{convertCleanString(post.title)}</span>
              <PostComment>[{post.comment_count}]</PostComment>
              {setDate(post.created_at)[1] &&
                <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"} />
              }
            </PostTitle>
            <PostInfo>
              <PostAuthor>{post.nickname}</PostAuthor>
              <PostCreatedAt>{computedOnlyDate(post.created_at)} <span style={{ marginLeft: '7px' }}>{computedOnlyTime(post.created_at)}</span></PostCreatedAt>
            </PostInfo>
          </PostHead>
          <MobilePostHead>
            <MobilePostTitle>
              <span style={{ fontWeight: '600' }}>{convertNoticeTag(post.board_id)}</span>
              <span>{convertCleanString(post.title)}</span>
              <span style={{ color: "#175c8e" }}>({post.comment_count})</span>
            </MobilePostTitle>
            <MobilePostInfo>
              <span>조회 {post.hit} · </span>
              <span>{post.nickname}</span>
              <span style={{ float: 'right' }}>{computedOnlyDate(post.created_at)}</span>
            </MobilePostInfo>
            {((isMyPost || type === 'anonymous') && type !== 'notice') &&
              <MobileButtonGroup>
                {type === 'anonymous' &&
                  <TempPasswordInputField
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    placeholder="게시글 비밀번호"
                  />
                }
                {(isMyPost || type === 'anonymous') &&
                  <>
                    <EditButton onClick={onClickEditButton}>수정</EditButton>
                    <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
                  </>
                }
              </MobileButtonGroup>
            }
          </MobilePostHead>
          <PostBody>
            {parse(post.content)}
          </PostBody>
        </div>
      }
    </>
  )
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    comment_count: PropTypes.number,
    created_at: PropTypes.string,
    nickname: PropTypes.string,
    content: PropTypes.string,
    hit: PropTypes.number,
    comment: PropTypes.object
  }),
  type: PropTypes.oneOf(['notice', 'free', 'job', 'question', 'anonymous']),
  history: PropTypes.object,
  loading: PropTypes.bool,
  isMyPost: PropTypes.bool,
  password: PropTypes.string,
  onChangePassword: PropTypes.func,
  onClickEditButton: PropTypes.func,
  onClickDeleteButton: PropTypes.func,
  registerComment: PropTypes.func,
  editComment: PropTypes.func,
  deleteComment: PropTypes.func,
}

export default Post
