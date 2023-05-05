export function makeLeaf(data) {
  const nickname = { nickname: data.user.nickname };
  const title = { title: data.title };
  const content = { content: data.content };
  const type = { type: data.type };
  const codes = { codes: data.codes };
  const parentLeafId = { parentLeafId: data.parent_leaf_id };
  const exportCnt = { exportCnt: data.export };
  const likeCnt = { likeCnt: data.likes.length };
  const response = {
    ...nickname,
    ...title,
    ...content,
    ...type,
    ...codes,
    ...exportCnt,
    ...parentLeafId,
    ...likeCnt,
  };
  return response;
}

export function makeTopicLeafs(data) {
  const likeCnt = { likeCnt: data.likes.length };
  const { user, likes, topic, ...obj } = data;
  data = obj;
  const response = {
    ...likeCnt,
    ...data,
  };
  return response;
}

export function searchTopic(data) {
  const topic_id = { topic_id: data.topic_id };
  const needHelp = { needHelp: data.needHelp };
  const creation_time = { creation_time: data.creation_time };
  const rootLeaf = { rootLeaf: makeLeaf(data.rootLeaf) };
  const bestLeaf = { bestLeaf: makeLeaf(data.bestLeaf) };
  // const leafs = { leafs: data.leafs.map((data) => makeLeaf(data)) };
  const response = {
    ...topic_id,
    ...needHelp,
    ...creation_time,
    ...rootLeaf,
    ...bestLeaf,
  };
  return response;
}
