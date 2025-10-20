// 代码生成时间: 2025-10-20 17:29:51
const MemberPointsSystem = (function() {

  // 定义一个简单的会员积分系统
  // 会员积分系统将存储会员信息和他们的积分
  const members = [];

  // 定义一个类来表示会员
  class Member {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.points = 0; // 初始积分为0
    }

    // 增加积分
    addPoints(points) {
      if (points < 0) {
        throw new Error('不能添加负数积分');
      }
      this.points += points;
      return this.points;
    }

    // 获取会员积分
    getPoints() {
      return this.points;
    }
  }

  // 定义一个类来管理会员积分系统
  class PointsSystem {
    constructor() {
      this.members = [];
    }

    // 添加会员
    addMember(id, name) {
      if (!id || !name) {
        throw new Error('会员ID和姓名不能为空');
      }
      const existingMember = this.members.find(m => m.id === id);
      if (existingMember) {
        throw new Error('已存在相同ID的会员');
      }
      const newMember = new Member(id, name);
      this.members.push(newMember);
      return newMember;
    }

    // 根据ID查找会员
    findMemberById(id) {
      const member = this.members.find(m => m.id === id);
      if (!member) {
        throw new Error('会员不存在');
      }
      return member;
    }

    // 为会员增加积分
    addPointsForMember(id, points) {
      const member = this.findMemberById(id);
      return member.addPoints(points);
    }

    // 获取会员积分
    getMemberPoints(id) {
      const member = this.findMemberById(id);
      return member.getPoints();
    }
  }

  // 暴露一个函数来创建积分系统的实例
  return function() {
    return new PointsSystem();
  };
})();

// 使用示例
try {
  const pointsSystem = MemberPointsSystem();
  const member1 = pointsSystem.addMember('001', '张三');
  console.log('增加积分前:', pointsSystem.getMemberPoints('001'));
  pointsSystem.addPointsForMember('001', 100);
  console.log('增加积分后:', pointsSystem.getMemberPoints('001'));
} catch (error) {
  console.error(error.message);
}
