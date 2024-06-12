
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,
		flag: 'add',
		forms: [],
		idx: -1,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);

		if (options && options.flag == 'edit' && options.idx) {
			this.setData({
				idx: options.idx,
				flag: 'edit'
			}, () => {
				this._loadDetail();
			})
		}
		else
			this._loadDetail();
	},


	_loadDetail: async function () {
		let parent = pageHelper.getPrevPage(2);
		if (!parent || !parent.data.meet) return;

		this.setData({
			meet: parent.data.meet,
			isLoad: true
		});

		if (this.data.flag == 'edit') {
			this.setData({
				forms: parent.data.formsList[this.data.idx]
			})
		}

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	bindCheckTap: async function (e) {
		this.selectComponent("#form-show").checkForms();
	},


	bindSubmitCmpt: async function (e) {

		let parent = pageHelper.getPrevPage(2);
		if (!parent) return;
		let formsList = parent.data.formsList;

		let forms = e.detail;


		if (this.data.flag == 'edit') {
			formsList[this.data.idx] = forms;
		}
		else {
			formsList.push(forms);
		}

		parent.setData({
			formsList
		});

		wx.navigateBack();


	}


})