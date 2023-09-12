class Utils {
  static getRemoveObjIndexs(fields: Record<'id', string>[], target: string) {
    const removeObjIndexs: number[] = [];
    fields.forEach((item, index) => {
      const { id, ...clone } = item;
      const value = Object.values(clone).join('');
      if (value == target) removeObjIndexs.push(index);
    });
    return removeObjIndexs;
  }
  static translateStatus(status: string) {
    const translateStatus: any = {
      published: '已發布',
      closed: '關閉',
      draft: '草稿',
    };
    return translateStatus[status];
  }
}

export default Utils;
