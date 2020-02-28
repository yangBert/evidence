export default function createPagination(data) {
  return {
    current: data.pageNo,
    pageSize: data.pageSize,
    total: data.totalSize,
    defaultPageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true
  }
} 