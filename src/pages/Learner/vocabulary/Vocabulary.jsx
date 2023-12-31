import { Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WordLists from "../../../components/word-lists/WordLists";
import {
  getAllWL,
  getWordListsDefault,
  getWordListsPublic,
} from "../../../stores/word-lists/wordLists-thunk";
import "./Vocabulary.scss";
const Vocabulary = () => {
  const dispatch = useDispatch();
  const { wordLists, wordListsDefault, wordListsPublic } = useSelector(
    (state) => state.wordLists
  );
  useEffect(() => {
    dispatch(getAllWL());
    dispatch(getWordListsDefault());
    dispatch(getWordListsPublic());
    return () => {};
  }, [dispatch]);
  return (
    <Space className="wrap mainwrap" direction="vertical" align="center">
      <Space className="vocab" wrap direction="vertical">
        <div className="vocab__title">English Vocabulary</div>
        <div className="vocab__intro">Categorized word lists</div>
      </Space>
      <WordLists type="self" wordLists={wordLists} />
      <WordLists type="default" wordLists={wordListsDefault} />
      <WordLists type="public" wordLists={wordListsPublic} />
    </Space>
  );
};

export default Vocabulary;
