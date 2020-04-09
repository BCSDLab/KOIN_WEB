import React, {Fragment, useState} from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1132px;
  height: 150.5px;
  display: flex;
  
  @media(max-width: 576px){
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin: 31px 0 0 0;
  }
`;

const MobileTab = styled.div`
  display: none;
  
  @media(max-width: 576px){
    display: flex;
  }
`;

const HotBoard = styled.section`
  width: 50%;
  
  @media(max-width: 576px){
    width: 100%;
    padding: 21px 0 0 0;
  }
`;

const NewBoard = styled.section`
  width: 50%;
  box-sizing: border-box;
  padding-left: 39px;
  
  @media(max-width: 576px){
    width: 100%;
    padding: 21px 0 0 0;
  }
`;

const Title = styled.h2`
  font-family: NanumSquare;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.15;
  text-align: left;
  margin: 0 0 20px 0;
  color: #175c8e;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const Contents = styled.article`
  font-family: NanumBarunGothic;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-bottom: 13px;
  
  @media(max-width: 576px){
    margin-bottom: 14px;
  }
`;

const HotBoardContent = styled.div`
  width: 100%;
  padding-right: 19.5px;
  border-right: 1px solid #eeeeee;
  
  ${Contents}:last-child{
    margin-bottom: 0;
  }
  
  @media(max-width: 576px){
    padding: 0;
    border-right: none;
  }
`;

const NewBoardContent = styled.div`
  width: 100%;
  
  ${Contents}:last-child{
    margin-bottom: 0;
  }
`;

const ContentsInfo = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: normal;
  
  @media(max-width: 576px){
    font-size: 14px;
  }
`;

const Rank = styled.span`
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  font-size: 13px;
  font-family: NanumSquareB;
  font-weight: bold;
  line-height: 1.08;
  text-align: center;
  color: #bbbbbb;
  border: 1px solid #bbbbbb;
  padding: 1px 5px;
  border-radius: 4px;
  margin-right: 10px;
  
  @media(max-width: 576px){
    display: none;
  }
`;

const BoardTitle = styled.span`
  font-size: 15px;
  font-weight: bold;
  text-align: left;
  margin-right: 10px;
  line-height: 1.2;
  color: #252525;
  
  @media(max-width: 576px){
    margin-right: 2px;
  }
`;

const ContentTitle = styled.span`
  max-width: 330px;
  font-size: 15px;
  text-align: left;
  color: #252525;
  margin-right: 10px;
  line-height: 1.2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: normal;
  
  @media(max-width: 576px){
    max-width: 60%;
  }
`;

const Comment = styled.div`
  opacity: 0.6;
  font-size: 12px;
  line-height: 1.17;
  text-align: left;
  color: #9fa9b3;
  margin-right: 10px;
  
  @media(max-width: 576px){
    font-size: 15px;
    margin-right: 3px;
  }
`;

const N = styled.img.attrs({
  src: "https://static.koreatech.in/upload/7f2af097aeeca368b0a491f9e00f80ca.png"
})`
  width: 14px;
  height: 14px;
`;

const Time = styled.span`
  font-size: 13px;
  line-height: 1.15;
  text-align: right;
  color: #175c8e;
  
  @media(max-width: 576px){
    font-family: NanumBarunGothic;
    font-size: 11px;
    line-height: 1.09;
    letter-spacing: normal;
    color: #252525;
    white-space: nowrap;
  }
`;

const MobileTabTitle = styled.h2`
  width: 50%;
  font-family: NanumSquare;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.13;
  letter-spacing: normal;
  text-align: center;
  color: #175c8e;
  padding-bottom: 11px;
  margin: 0;
  border-bottom: ${props => props.selected? "2px solid #175c8e": '2px solid #d0d6db' };
`;

export default React.memo(function IndexTopBoard({
  history,
  mobileFlag,
  hotBoardList,
  newBoardList
}) {
  function displayBoard(id) {
    if (id === 1) return "[자유]";
    else if (id === 2) return "[취업]";
    else if (id === 3 || id === 5) return "[일반]";
    else if (id === 4) return "[공지]";
    else if (id === 6) return "[장학]";
    else if (id === 7) return "[학사]";
    else if (id === 8) return "[취업]";
    else if (id === 9) return "[코인]";
    else if (id === 10) return "[질문]";
    else if (id === undefined) return "[익명]";
    else return "";
  }
  function convertTitle(string) {
    let entityMap = {
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
    };
    for (let key in entityMap) {
      let entity = entityMap[key];
      let regex = new RegExp(entity, 'g');
      string = string.replace(regex, key);
    }
    string = string.replace(/&quot;/g, '"');
    string = string.replace(/&amp;/g, '&');
    return string;
  }
  function changeTime (time, newFlag) {
    if(!newFlag) {
      let times = time.split(" ")
      let date = times[0].split("-");
      let tim = times[1].split(":");
      let created = new Date();
      created.setFullYear(date[0]);
      created.setMonth(date[1] - 1);
      created.setDate(date[2]);
      created.setHours(tim[0]);
      created.setMinutes(tim[1]);
      created.setSeconds(tim[2]);
      return created;
    }
    else {
      let times = time.split("T")
      let date = times[0].split("-");
      let tim = times[1].split(":");
      let created = new Date();
      created.setFullYear(date[0]);
      created.setMonth(date[1] - 1);
      created.setDate(date[2]);
      created.setHours(tim[0]);
      created.setMinutes(tim[1]);
      created.setSeconds(tim[2]);
      return created;
    }
  }
  function computedTime (time, newFlag) {
    let today = new Date();
    let created = changeTime(time, newFlag);
    if (
      Math.ceil((today - created) / 1000 / 60) < 60 &&
      Math.ceil((today - created) / 1000 / 60) > 0
    )
      return [Math.floor((today - created) / 1000 / 60) + "분 전", true];

    if (
      Math.floor((today - created) / 60 / 1000 / 60) < 4 &&
      Math.floor((today - created) / 60 / 1000 / 60) > 0
    )
      return [
        Math.floor((today - created) / 60 / 60 / 1000) + "시간 전",
        true
      ];
    else if (
      Math.floor((today - created) / 60 / 1000 / 60) < 24 &&
      Math.floor((today - created) / 60 / 1000 / 60) > 0
    )
      return [
        Math.floor((today - created) / 60 / 1000 / 60) + "시간 전",
        false
      ];
    else {
      let year = created.getFullYear();
      let month =
        created.getMonth() + 1 < 10
          ? "0" + (created.getMonth() + 1)
          : created.getMonth() + 1;
      let date =
        created.getDate() < 10 ? "0" + created.getDate() : created.getDate();
      let hour =
        created.getHours() < 10
          ? "0" + created.getHours()
          : created.getHours();
      let minutes =
        created.getMinutes() < 10
          ? "0" + created.getMinutes()
          : created.getMinutes();

      if (Math.floor((today - created) / 60 / 1000 / 60) < 0) {
        return [
          String(year) +
          "." +
          String(month) +
          "." +
          String(date) +
          " " +
          String(hour) +
          ":" +
          String(minutes),
          true
        ];
      }
      return [
        String(year) +
        "." +
        String(month) +
        "." +
        String(date) +
        " " +
        String(hour) +
        ":" +
        String(minutes),
        false
      ];
    }
  }
  function clickList(id, boardId) {
    if(boardId === 1) {
      history.push(`board/free/${id}`);
    }
    else if(boardId === 2) {
      history.push(`board/job/${id}`);
    }
    else if(boardId === 10) {
      history.push(`board/question/${id}`);
    }
    else if(boardId === 1) {
      history.push(`board/free/${id}`);
    }
    else if(boardId === undefined) {
      history.push(`board/anonymous/${id}`);
    }
    else history.push(`board/notice/${id}`);
  }
  const [selectedTab, selectTab] = useState("인기게시물")

  return(
    <Container>
      <MobileTab>
        <MobileTabTitle
          selected={selectedTab === "인기게시물"}
          onClick={() => selectTab("인기게시물")}>
          인기게시물
        </MobileTabTitle>
        <MobileTabTitle
          selected={selectedTab === "최근게시물"}
          onClick={() => selectTab("최근게시물")}>
          최근게시물
        </MobileTabTitle>
      </MobileTab>
      {(!mobileFlag || selectedTab === "인기게시물") &&
      <HotBoard>
        <Title>
          인기게시물
        </Title>
        <HotBoardContent>
          {hotBoardList &&
          hotBoardList.map((board, index) => {
            return (
              <Fragment key={index}>
                {index < 4 &&
                <Contents>
                  <ContentsInfo onClick={() => clickList(board.id, board.board_id)}>
                    <Rank>{index + 1}</Rank>
                    <BoardTitle>{displayBoard(board.board_id)}</BoardTitle>
                    <ContentTitle>{convertTitle(board.title)}</ContentTitle>
                    <Comment>[{board.comment_count}]</Comment>
                    {computedTime(board.created_at, false)[1] &&
                    <N/>
                    }
                  </ContentsInfo>
                  <Time>{computedTime(board.created_at, false)[0].substring(0, 10)}</Time>
                </Contents>
                }
              </Fragment>
            )
          })
          }
        </HotBoardContent>
      </HotBoard>
      }
      {(!mobileFlag || selectedTab === "최근게시물") &&
      <NewBoard>
        <Title>
          최근게시물
        </Title>
        <NewBoardContent>
          {newBoardList &&
          newBoardList.map((board, index) => {
            return (
              <Contents key={index}>
                <ContentsInfo onClick={() => clickList(board.id, board.board_id)}>
                  <BoardTitle>{displayBoard(board.board_id)}</BoardTitle>
                  <ContentTitle>{convertTitle(board.title)}</ContentTitle>
                  <Comment>[{board.comment_count}]</Comment>
                  {computedTime(board.created_at, true)[1] &&
                  <N/>
                  }
                </ContentsInfo>
                <Time>{computedTime(board.created_at, true)[0].substring(0, 10)}</Time>
              </Contents>
            )
          })
          }
        </NewBoardContent>
      </NewBoard>
      }
    </Container>
  )
})
