import React from 'react'
import styled, { css } from 'styled-components';
import Pagination from '../SharedComponents/Pagination';
import ClipLoader from 'react-spinners/ClipLoader';
import PropTypes from 'prop-types';

const Table = styled.div`
  border-top: 2px solid #175c8e;
  border-bottom: 2px solid #175c8e;
  border-collapse: collapse;
  font-size: 13px;
  width: 834px;
  margin-bottom: 22px;
  letter-spacing: -0.8px;
  @media (max-width: 576px) {
    width: 100%;
    border: none;
  }
`;

const TableHead = styled.div`
  width: 100%;
  height: 44px;
  font-weight: bold;

  @media (max-width: 576px) {
    display: none;
  }
`;

const TableHeadRow = styled.div`
  width: 100%;
  height: 100%;
  font-size: 13px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #175c8e;
`;

const TableHeadContent = styled.div`
  height: 100%;
  border-bottom: 1px #175c8e solid;
  font-size: 15px;
  letter-spacing: -0.6px;
  color: #175c8e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableBodyRow = styled.article`
  height: 68px;
  cursor: pointer;
  border-bottom: 1px #d2dae2 solid;
  display: flex;

  &:hover {
    background: #f8fafb;
  }
  @media (max-width: 576px) {
    height: 75px;
    display: block;
    border-bottom: 1px solid #ececec;
  }
`;

const PostTitle = styled.span`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostTitleStyle = css`
  width: 412px;
  font-size: 15px;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
`;

const PostAuthorStyle = css`
  overflow: hidden;
  white-space: pre-line;
  display:-webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  line-height: 15px;
  height: 30px;
  margin: 19px 5px;
  
  @media all and (-ms-high-contrast: none) {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: normal;
    margin-top: 23px;
  }
`

const TableBodyContent = styled.div`
  height: 100%;
  color: #252525;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.isTitle && PostTitleStyle};
  ${props => props.isAuthor && PostAuthorStyle}
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const LoaderWrapper = styled.div`
  width: 834px;
  height: 680px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    width: 100%;
    height: 760px;
    border-bottom: 2px solid #175c8e;
  }
`;

const CommentCount = styled.span`
  position: relative;
  font-size: 12px;
  color: #175c8e;
  letter-spacing: -0.6px;
  padding-left: 3px;
`;

const NewTag = styled.img`
  margin-left: 10px;
  width: 14.5px;
  height: 15px;
  position: relative;
`;

const MobilePostWrapper = styled.div`
  display: none;
  @media (max-width: 576px) {
    height: 100%;
    box-sizing: border-box;
    display: block!important;
    padding: 16px 16px 14.5px 16px;
  }
`;

const MobilePostTitle = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
    text-align: left;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    & span {
      font-size: 16px;
      letter-spacing: -0.8px;
      line-height: 1.5;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.87);
    }
  }
`;

const MobilePostInfo = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
    text-align: left;
  }
`;

const MobileNicknameStyle = css`
  width: calc(100% - 66px);
  display: inline-block;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobilePostInfoText = styled.span`
  display: none;
  @media (max-width: 576px) {
    display: inline;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.54;
    letter-spacing: -0.7px;
    color: #a1a1a1;
    
    ${props => props.nickname && MobileNicknameStyle}
  }
`;

function Posts({
  history,
  path,
  posts,
  loading,
  totalPageNum,
  getPostList
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
  return (
    <>
      <Table>
        <TableHead>
          <TableHeadRow>
            <TableHeadContent style={{ width: '85px' }}>번호</TableHeadContent>
            <TableHeadContent style={{ width: '422px' }}>제목</TableHeadContent>
            <TableHeadContent style={{ width: '149px' }}>작성자</TableHeadContent>
            <TableHeadContent style={{ width: '70px' }}>날짜</TableHeadContent>
            <TableHeadContent style={{ width: '108px' }}>조회수</TableHeadContent>
          </TableHeadRow>
        </TableHead>
        <div>
          {loading &&
            <LoaderWrapper>
              <ClipLoader
                color={"#175c8e"}
                size={200}
                loading={loading}
              />
            </LoaderWrapper>
          }
          {!loading && posts && posts.map((post, index) =>
            <TableBodyRow key={index} onClick={() => history.push(`/board/${path}/${post.id}`)}>
              <TableBodyContent style={{ width: '85px' }}>{post.id}</TableBodyContent>
              <TableBodyContent isTitle>
                <span style={{ fontWeight: '600' }}>{convertNoticeTag(post.board_id)}</span>
                <PostTitle>{convertTitle(post.title)}</PostTitle>
                {post.comment_count !== 0 && <CommentCount>[{post.comment_count}]</CommentCount>}
                {setDate(post.created_at)[1] &&
                  <NewTag src={"https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"} />
                }
              </TableBodyContent>
              <TableBodyContent isAuthor style={{ width: '139px', color: "#175c8e" }}>{post.nickname || post.author}</TableBodyContent>
              <TableBodyContent style={{ width: '70px', fontSize: '15px' }}>{setDate(post.created_at)[0]}</TableBodyContent>
              <TableBodyContent style={{ width: '108px' }}>{post.hit}</TableBodyContent>
              <MobilePostWrapper key={index}>
                <MobilePostTitle>
                  <span style={{ fontWeight: '600' }}>{convertNoticeTag(post.board_id)}</span>
                  <span>{convertTitle(post.title)}</span>
                  {post.comment_count !== 0 && <span style={{ color: '#175c8e' }}>[{post.comment_count}]</span>}
                </MobilePostTitle>
                <MobilePostInfo>
                  <MobilePostInfoText nickname>조회 {post.hit} · {post.nickname || post.author}</MobilePostInfoText>
                  <MobilePostInfoText style={{fontWeight: "300", float: 'right' }}>{setDate(post.created_at)[0]}</MobilePostInfoText>
                </MobilePostInfo>
              </MobilePostWrapper>
            </TableBodyRow>
          )}
        </div>
      </Table>
      <Pagination
        totalPageNum={totalPageNum}
        setPageData={getPostList}
        isWriteBtn={true}
        writeBtnLink={`${path}/register`}
        path={path}
        history={history}
      />
    </>
  )
}

Posts.propTypes = {
  history: PropTypes.object,
  path: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    comment_count: PropTypes.number,
    created_at: PropTypes.string,
    author: PropTypes.string,
    nickname: PropTypes.string,
    content: PropTypes.string,
    hit: PropTypes.number,
    comment: PropTypes.object
  })),
  loading: PropTypes.bool,
  totalPageNum: PropTypes.number,
  getPostList: PropTypes.func
}

export default Posts
