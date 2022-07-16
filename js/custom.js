/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var main_interval;
	var main_timeout;
	var secs = 0;
	var output = $('#output');
	var playerClass = "Paladin";
	var healingStatsOutput = $('#healing_stats');
	var simTimer = $('#sim_timer');
	var sim_timer = simTimer.val();
	var sim_timer_default = simTimer.val();
	var raid_size = 25;
	var healing_frame = $('#healing_frame');
	var start = $('.start');
	var healingPower;
	var buttonActive = false;
	var crit;
	var maxMana;
	var mana;
	var mp5;
	var mp5Timer = 0;
	var manaPot = $('.manaPot');
	var rune = $('.rune');
	var lmb_spell = "";
	var rmb_spell = "";
	var mmb_spell = ""
	var shift_lmb_spell = "";
	var shift_rmb_spell = "";
	var shift_mmb_spell = "";
	// Cooldowns
	var cooldown1 = "Essence of the Martyr";
	var cooldown2 = "Direbrew Hops";
	var scrollsOfBlindingLightActive = false;
	var scrollsOfBlindingLightCD = false;
	var essenceOfTheMartyrActive = false;
	var essenceOfTheMartyrCD = false;
	var direbrewHopsActive = false;
	var direbrewHopsCD = false;
	var isRunning = false;
	var isCasting = false;
	var isCancelled = false;
	var castingSpell = "";
	var meleeTargetInterval;
	var singleTargetInterval;
	var allTargetsInterval;
	var multiTargetInterval;
	var healing_interval;
	var warning_interval;
	var mp5_interval;
	var mp5_global;
	var target = "";
	var playerHealingDone = 0;
	var fightTimer = 120;
	var powerInfusionActive = false;
	var lb_interval_0;
	var lb_interval_1;
	var lb_interval_2;
	var lb_interval_3;
	var lb_interval_4;
	var lb_interval_5;
	var lb_interval_6;
	var lb_interval_7;
	var lb_interval_8;
	var lb_interval_9;
	var lb_interval_10;
	var lb_interval_11;
	var lb_interval_12;
	var lb_interval_13;
	var lb_interval_14;
	var lb_interval_15;
	var lb_interval_16;
	var lb_interval_17;
	var lb_interval_18;
	var lb_interval_19;
	var lb_interval_20;
	var lb_interval_21;
	var lb_interval_22;
	var lb_interval_23;
	var lb_interval_24;
	var players = 
	[
		{id: '0', name: 'Madwall', class:'warrior', role: 'mt', status:'alive', health: 16000, healthMax: 16000, avoidance: 45},
		{id: '1', name: 'Hiddenstar', class:'warrior', role: 'tank', status:'alive', health: 15000, healthMax: 15000, avoidance: 35},
		{id: '2', name: 'Flowerboi', class:'warrior', role: 'tank', status:'alive', health: 15000, healthMax: 15000, avoidance: 35},
		{id: '3', name: 'Kungfupro', class:'warlock', role: 'ranged', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '4', name: 'Stylecop', class:'hunter', role: 'ranged', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '5', name: 'Cultnuker', class:'hunter', role: 'ranged', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '6', name: 'Gravecake', class:'shaman', role: 'ranged', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '7', name: 'Leetqueen', class:'hunter', role: 'ranged', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '8', name: 'Fatwinner', class:'warrior', role: 'tank', status:'alive', health: 15000, healthMax: 15000, avoidance: 35},
		{id: '9', name: 'Warflame', class:'hunter', role: 'ranged', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '10', name: 'Wishball', class:'rogue', role: 'melee', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '11', name: 'Kungfupally', class:'paladin', role: 'melee', status:'alive', health: 8500, healthMax: 8500, avoidance: 5},
		{id: '12', name: 'Lostminion', class:'mage', role: 'ranged', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '13', name: 'Startaste', class:'warlock', role: 'ranged', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '14', name: 'Vengeance', class:'mage', role: 'ranged', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '15', name: 'Parsegod', class:'priest', role: 'healer', status:'alive', health: 8000, healthMax: 8000, reaction: 20, isHealing: false, healingDone: 0, healingPower: 2400, avoidance: 5, focus: 'raid'},
		{id: '16', name: 'Evilguru', class:'mage', role: 'ranged', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '17', name: 'Caveruler', class:'shaman', role: 'ranged', status:'alive', health: 8300, healthMax: 8300, avoidance: 5},
		{id: '18', name: 'Madpro', class:'paladin', role: 'healer', status:'alive', health: 8500, healthMax: 8500, reaction: 450, isHealing: false, healingDone: 0, healingPower: 1700, avoidance: 5, focus: 'mt'},
		{id: '19', name: 'Player', class:'druid', role: 'healer', status:'alive', health: 8500, healthMax: 8500, reaction: 600, isHealing: false, healingDone: 0, healingPower: 1600, avoidance: 5, focus: 'raid'},
		{id: '20', name: 'Fancyboi', class:'priest', role: 'healer', status:'alive', health: 8000, healthMax: 8000, reaction: 500, isHealing: false, healingDone: 0, healingPower: 1400, avoidance: 5, focus: 'raid'},
		{id: '21', name: 'Legion', class:'shaman', role: 'melee', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '22', name: 'Orcmelter', class:'warrior', role: 'melee', status:'alive', health: 8000, healthMax: 8000, avoidance: 5},
		{id: '23', name: 'Coolblade', class:'paladin', role: 'healer', status:'alive', health: 8000, healthMax: 8000, reaction: 370, isHealing: false, healingDone: 0, healingPower: 1800, avoidance: 5, focus: 'mt'},
		{id: '24', name: 'Lustnerd', class:'warlock', role: 'ranged', status:'alive', health: 8250, healthMax: 8250, avoidance: 5},
	];
	var healers;
	var boss = 
	{
		time: 60
	};
	var boss_abilities = 
	[
		{bossname: 'type1', name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 3500, crit: 12, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type1', name: 'cleave', start: 1, time: 3, delay: 0, dmg: 1000, crit: 12, targets: 5, targetRole: "melee", warning: false},
		{bossname: 'type1', name: 'Shadowbolt Volley', start: 0, time: 15, delay: 0, dmg: 2000, crit: 0, targets: 12, miss: 0,  targetRole: "", warning: false},
		{bossname: 'type2', name: 'melee', start: 1, time: 1.5, delay: 0, dmg: 1500, crit: 5, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type2', name: 'Frost Aura', start: 1, time: 2, delay: 0, dmg: 250, crit: 0, targets: "all", targetRole: "", warning: false},
		{bossname: 'type2', name: 'Icebolt1', start: 5, time: 60, delay: 3, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt2', start: 5, time: 60, delay: 6, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt3', start: 5, time: 60, delay: 9, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt4', start: 5, time: 60, delay: 12, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type2', name: 'Icebolt5', start: 5, time: 60, delay: 15, dmg: 2500, crit: 0, targets: 1, targetRole: "", warning: true},
		{bossname: 'type3', name: 'melee', start: 1, time: 0.5, delay: 0, dmg: 1500, crit: 12, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type3', name: 'cleave', start: 1, time: 3, delay: 0, dmg: 2000, crit: 12, targets: 3, targetRole: "melee", warning: false},
		{bossname: 'type3', name: 'Shadowbolt Volley', start: 0, time: 15, delay: 0, dmg: "75%", crit: 0, targets: 8, miss: 0,  targetRole: "", warning: true},
		{bossname: 'type4', name: 'melee', start: 1, time: 0.5, delay: 0, dmg: 1500, crit: 12, targets: 1, targetRole: "mt", warning: false},
		{bossname: 'type4', name: 'cleave', start: 1, time: 3, delay: 0, dmg: 1500, crit: 12, targets: 2, targetRole: "", warning: false},
		{bossname: 'type4', name: 'Frost Aura', start: 1, time: 2, delay: 0, dmg: 250, crit: 0, targets: "all", targetRole: "", warning: false}

	];
	var spells = 
	[
		{class: 'paladin', name: 'Flash of Light (Rank 1)', id: 'FoL', castTime: 1500, min: 67, max: 77, mana: 35, coef: 0.19022},
		{class: 'paladin', name: 'Flash of Light (Rank 2)', id: 'FoL', castTime: 1500, min: 102, max: 117, mana: 50, coef: 0.22724},
		{class: 'paladin', name: 'Flash of Light (Rank 3)', id: 'FoL', castTime: 1500, min: 153, max: 171, mana: 70, coef: 0.27553},
		{class: 'paladin', name: 'Flash of Light (Rank 4)', id: 'FoL', castTime: 1500, min: 206, max: 231, mana: 90, coef: 0.32543},
		{class: 'paladin', name: 'Flash of Light (Rank 5)', id: 'FoL', castTime: 1500, min: 278, max: 310, mana: 115, coef: 0.3739},
		{class: 'paladin', name: 'Flash of Light (Rank 6)', id: 'FoL', castTime: 1500, min: 356, max: 396, mana: 140, coef: 0.42546},
		{class: 'paladin', name: 'Flash of Light (Rank 7)', id: 'FoL', castTime: 1500, min: 458, max: 513, mana: 180, coef: 0.42826},
		{class: 'paladin', name: 'Holy Light (Rank 1)', id: 'HL', castTime: 2000, min: 42, max: 51, mana: 35, coef: 0.03186},
		{class: 'paladin', name: 'Holy Light (Rank 2)', id: 'HL', castTime: 2000, min: 81, max: 96, mana: 60, coef: 0.08254},
		{class: 'paladin', name: 'Holy Light (Rank 3)', id: 'HL', castTime: 2000, min: 167, max: 196, mana: 110, coef: 0.19794},
		{class: 'paladin', name: 'Holy Light (Rank 4)', id: 'HL', castTime: 2000, min: 322, max: 368, mana: 190, coef: 0.33766},
		{class: 'paladin', name: 'Holy Light (Rank 5)', id: 'HL', castTime: 2000, min: 506, max: 569, mana: 275, coef: 0.41776},
		{class: 'paladin', name: 'Holy Light (Rank 6)', id: 'HL', castTime: 2000, min: 717, max: 799, mana: 365, coef: 0.49891},
		{class: 'paladin', name: 'Holy Light (Rank 7)', id: 'HL', castTime: 2000, min: 968, max: 1076, mana: 465, coef: 0.5885},
		{class: 'paladin', name: 'Holy Light (Rank 8)', id: 'HL', castTime: 2000, min: 1272, max: 1414, mana: 580, coef: 0.65897},
		{class: 'paladin', name: 'Holy Light (Rank 9)', id: 'HL', castTime: 2000, min: 1619, max: 1799, mana: 660, coef: 0.71686},
		{class: 'paladin', name: 'Holy Light (Rank 10)', id: 'HL', castTime: 2000, min: 1773, max: 1971, mana: 710, coef: 0.71367},
		{class: 'paladin', name: 'Holy Light (Rank 11)', id: 'HL', castTime: 2000, min: 2196, max: 2446, mana: 840, coef: 0.71876},
		{class: 'priest', name: 'Flash Heal (Rank 1)', id: 'FH', castTime: 1500, min: 202, max: 247, mana: 125},
		{class: 'priest', name: 'Flash Heal (Rank 2)', id: 'FH', castTime: 1500, min: 269, max: 325, mana: 155},
		{class: 'priest', name: 'Flash Heal (Rank 3)', id: 'FH', castTime: 1500, min: 339, max: 406, mana: 185},
		{class: 'priest', name: 'Flash Heal (Rank 4)', id: 'FH', castTime: 1500, min: 414, max: 492, mana: 215},
		{class: 'priest', name: 'Flash Heal (Rank 5)', id: 'FH', castTime: 1500, min: 534, max: 633, mana: 265},
		{class: 'priest', name: 'Flash Heal (Rank 6)', id: 'FH', castTime: 1500, min: 662, max: 783, mana: 315},
		{class: 'priest', name: 'Flash Heal (Rank 7)', cid: 'FH', astTime: 1500, min: 828, max: 975, mana: 380},
		{class: 'priest', name: 'Greater Heal (Rank 1)', id: 'GH', castTime: 2500, min: 924, max: 1039, mana: 314},
		{class: 'priest', name: 'Greater Heal (Rank 2)', id: 'GH', castTime: 2500, min: 1178, max: 1318, mana: 387},
		{class: 'priest', name: 'Greater Heal (Rank 3)', id: 'GH', castTime: 2500, min: 1470, max: 1642, mana: 463},
		{class: 'priest', name: 'Greater Heal (Rank 4)', id: 'GH', castTime: 2500, min: 1813, max: 2021, mana: 557},
		{class: 'priest', name: 'Greater Heal (Rank 5)', id: 'GH', castTime: 2500, min: 1966, max: 2194, mana: 604},
		{class: 'priest', name: 'Renew (Rank 1)', id: 'RN', castTime: 0, min: 45, max: 45, duration: 15, interval: 3, mana: 30},
		{class: 'priest', name: 'Renew (Rank 2)', id: 'RN', castTime: 0, min: 100, max: 100, duration: 15, interval: 3, mana: 65},
		{class: 'priest', name: 'Renew (Rank 3)', id: 'RN', castTime: 0, min: 175, max: 175, duration: 15, interval: 3, mana: 105},
		{class: 'priest', name: 'Renew (Rank 4)', id: 'RN', castTime: 0, min: 245, max: 245, duration: 15, interval: 3, mana: 140},
		{class: 'priest', name: 'Renew (Rank 5)', id: 'RN', castTime: 0, min: 315, max: 315, duration: 15, interval: 3, mana: 170},
		{class: 'priest', name: 'Renew (Rank 6)', id: 'RN', castTime: 0, min: 400, max: 400, duration: 15, interval: 3, mana: 205},
		{class: 'priest', name: 'Renew (Rank 7)', id: 'RN', castTime: 0, min: 510, max: 510, duration: 15, interval: 3, mana: 250},
		{class: 'priest', name: 'Renew (Rank 8)', id: 'RN', castTime: 0, min: 650, max: 650, duration: 15, interval: 3, mana: 305},
		{class: 'priest', name: 'Renew (Rank 9)', id: 'RN', castTime: 0, min: 810, max: 810, duration: 15, interval: 3, mana: 365},
		{class: 'priest', name: 'Renew (Rank 10)', id: 'RN', castTime: 0, min: 970, max: 970, duration: 15, interval: 3, mana: 410},
		{class: 'priest', name: 'Prayer of Healing (Rank 1)', id: 'PoH', castTime: 3000, min: 312, max: 333, mana: 328},
		{class: 'priest', name: 'Prayer of Healing (Rank 2)', id: 'PoH', castTime: 3000, min: 458, max: 487, mana: 448},
		{class: 'priest', name: 'Prayer of Healing (Rank 3)', id: 'PoH', castTime: 3000, min: 675, max: 713, mana: 616},
		{class: 'priest', name: 'Prayer of Healing (Rank 4)', id: 'PoH', castTime: 3000, min: 939, max: 991, mana: 824},
		{class: 'priest', name: 'Prayer of Healing (Rank 5)', id: 'PoH', castTime: 3000, min: 1041, max: 1099, mana: 1070},
		{class: 'priest', name: 'Circle of Healing (Rank 1)', id: 'CoH', castTime: 0, min: 250, max: 274, mana: 300},
		{class: 'priest', name: 'Circle of Healing (Rank 2)', id: 'CoH', castTime: 0, min: 292, max: 323, mana: 337},
		{class: 'priest', name: 'Circle of Healing (Rank 3)', id: 'CoH', castTime: 0, min: 332, max: 367, mana: 375},
		{class: 'priest', name: 'Circle of Healing (Rank 4)', id: 'CoH', castTime: 0, min: 376, max: 415, mana: 412},
		{class: 'priest', name: 'Circle of Healing (Rank 5)', id: 'CoH', castTime: 0, min: 409, max: 451, mana: 450},
		{class: 'shaman', name: 'Chain Heal (Rank 1)', id: 'CH', castTime: 2500, min: 332, max: 381, mana: 260},
		{class: 'shaman', name: 'Chain Heal (Rank 2)', id: 'CH', castTime: 2500, min: 419, max: 479, mana: 315},
		{class: 'shaman', name: 'Chain Heal (Rank 3)', id: 'CH', castTime: 2500, min: 567, max: 646, mana: 405},
		{class: 'shaman', name: 'Chain Heal (Rank 4)', id: 'CH', castTime: 2500, min: 624, max: 710, mana: 435},
		{class: 'shaman', name: 'Chain Heal (Rank 5)', id: 'CH', castTime: 2500, min: 833, max: 950, mana: 540},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 1)', id: 'LHW', castTime: 1500, min: 170, max: 195, mana: 105, coef: 0.189},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 2)', id: 'LHW', castTime: 1500, min: 257, max: 292, mana: 145, coef: 0.239},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 3)', id: 'LHW', castTime: 1500, min: 349, max: 394, mana: 185, coef: 0.282},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 4)', id: 'LHW', castTime: 1500, min: 473, max: 529, mana: 235, coef: 0.336},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 5)', id: 'LHW', castTime: 1500, min: 649, max: 723, mana: 305, coef: 0.382},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 6)', id: 'LHW', castTime: 1500, min: 853, max: 949, mana: 380, coef: 0.429},
		{class: 'shaman', name: 'Lesser Healing Wave (Rank 7)', id: 'LHW', castTime: 1500, min: 1051, max: 1198, mana: 440, coef: 0.429},
		{class: 'shaman', name: 'Healing Wave (Rank 1)', id: 'HW', castTime: 2500, min: 36, max: 47, mana: 25, coef: 0.0211},
		{class: 'shaman', name: 'Healing Wave (Rank 2)', id: 'HW', castTime: 2500, min: 69, max: 83, mana: 45, coef: 0.0659},
		{class: 'shaman', name: 'Healing Wave (Rank 3)', id: 'HW', castTime: 2500, min: 136, max: 163, mana: 80, coef: 0.164},
		{class: 'shaman', name: 'Healing Wave (Rank 4)', id: 'HW', castTime: 2500, min: 279, max: 328, mana: 155, coef: 0.329},
		{class: 'shaman', name: 'Healing Wave (Rank 5)', id: 'HW', castTime: 2500, min: 389, max: 454, mana: 200, coef: 0.429},
		{class: 'shaman', name: 'Healing Wave (Rank 6)', id: 'HW', castTime: 2500, min: 552, max: 639, mana: 265, coef: 0.527},
		{class: 'shaman', name: 'Healing Wave (Rank 7)', id: 'HW', castTime: 2500, min: 759, max: 874, mana: 340, coef: 0.625},
		{class: 'shaman', name: 'Healing Wave (Rank 8)', id: 'HW', castTime: 2500, min: 1040, max: 1191, mana: 440, coef: 0.722},
		{class: 'shaman', name: 'Healing Wave (Rank 9)', id: 'HW', castTime: 2500, min: 1394, max: 1589, mana: 560, coef: 0.820},
		{class: 'shaman', name: 'Healing Wave (Rank 10)', id: 'HW', castTime: 2500, min: 1647, max: 1878, mana: 620, coef: 0.857},
		{class: 'shaman', name: 'Healing Wave (Rank 11)', id: 'HW', castTime: 2500, min: 1756, max: 2001, mana: 655, coef: 0.857},
		{class: 'shaman', name: 'Healing Wave (Rank 12)', id: 'HW', castTime: 2500, min: 2134, max: 2436, mana: 720, coef: 0.857},
		{class: 'druid', name: 'Lifebloom', id: 'LB', castTime: 0, min: 273, max: 273, duration: 7, interval: 1, mana: 220}
	];
	// Cooldowns list
	var cooldowns =
	[
		{class: 'paladin,priest,druid,shaman', name: 'Essence of the Martyr', duration: 20, cooldown: 120},
		{class: 'paladin,priest,druid,shaman', name: 'Direbrew Hops', duration: 20, cooldown: 120},
		{class: 'paladin', name: 'Scrolls of Blinding Light', duration: 20, cooldown: 360}
	];
	var panels;

	initSettingsButton();
	initClass();
	initSpells();
	initHealingFrame();
	initFight(); //starts the fight
	initAI();
	initButton();
	initCDs();

	// Handle Keyboard inputs
	$(document).keydown(function(event)
	{
		// console.log(event.which);
		// Prevent f1
		if(event.which === 112)
		{
			event.preventDefault();
		}

		// Cancel Heals
		if(event.which === 87)
		{
			isCancelled = true;
		}
		if(event.which === 65)
		{
			isCancelled = true;
		}
		if(event.which === 83)
		{
			isCancelled = true;
		}
		if(event.which === 68)
		{
			isCancelled = true;
		}
		// Use Cooldowns
		if(event.which === 49)
		{
			if(isRunning)
			{
				if(cooldown1 === "Essence of the Martyr" && !essenceOfTheMartyrCD)
				{
					var originalHealingPower = $('.healing_input').val();
					if(!essenceOfTheMartyrActive)
					{
						healingPower = parseInt(healingPower) + 297;
					}
					essenceOfTheMartyrActive = true;
					setTimeout(function()
					{
						essenceOfTheMartyrActive = false;
						healingPower = originalHealingPower;
					}, 20000);
					if(!essenceOfTheMartyrCD)
					{
						essenceOfTheMartyrCD = true;
						setTimeout(function()
						{
							essenceOfTheMartyrCD = false;
						}, 120000);
					}
				}
				if(cooldown1 === "Direbrew Hops" && !direbrewHopsCD)
				{
					var originalHealingPower = $('.healing_input').val();
					if(!direbrewHopsActive)
					{
						healingPower = parseInt(healingPower) + 297;
					}
					direbrewHopsActive = true;
					setTimeout(function()
					{
						direbrewHopsActive = false;
						healingPower = originalHealingPower;
					}, 20000);
					if(!direbrewHopsActive)
					{
						direbrewHopsActive = true;
						setTimeout(function()
						{
							direbrewHopsActive = false;
						}, 120000);
					}
				}
				if(cooldown1 === "Scrolls of Blinding Light")
				{
					if(!scrollsOfBlindingLightActive)
					{
						scrollsOfBlindingLightActive = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightActive = false;
						}, 20000);
					}
					if(!scrollsOfBlindingLightCD)
					{
						scrollsOfBlindingLightCD = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightCD = false;
						}, 120000);
					}
				}
			}
		}
		if(event.which === 50)
		{
			if(isRunning)
			{
				if(cooldown2 === "Essence of the Martyr" && !essenceOfTheMartyrCD)
				{
					var originalHealingPower = $('.healing_input').val();
					if(!essenceOfTheMartyrActive)
					{
						healingPower = parseInt(healingPower) + 297;
					}
					essenceOfTheMartyrActive = true;
					setTimeout(function()
					{
						essenceOfTheMartyrActive = false;
						healingPower = originalHealingPower;
					}, 20000);
					if(!essenceOfTheMartyrCD)
					{
						essenceOfTheMartyrCD = true;
						setTimeout(function()
						{
							essenceOfTheMartyrCD = false;
						}, 120000);
					}
				}
				if(cooldown2 === "Direbrew Hops" && !direbrewHopsCD)
				{
					var originalHealingPower = $('.healing_input').val();
					if(!direbrewHopsActive)
					{
						healingPower = parseInt(healingPower) + 297;
					}
					direbrewHopsActive = true;
					setTimeout(function()
					{
						direbrewHopsActive = false;
						healingPower = originalHealingPower;
					}, 20000);
					if(!direbrewHopsActive)
					{
						direbrewHopsActive = true;
						setTimeout(function()
						{
							direbrewHopsActive = false;
						}, 120000);
					}
				}
				if(cooldown2 === "Scrolls of Blinding Light")
				{
					if(!scrollsOfBlindingLightActive)
					{
						scrollsOfBlindingLightActive = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightActive = false;
						}, 20000);
					}
					if(!scrollsOfBlindingLightCD)
					{
						scrollsOfBlindingLightCD = true;
						setTimeout(function()
						{
							scrollsOfBlindingLightCD = false;
						}, 120000);
					}
				}
			}
		}
	});

	function initSettingsButton()
	{
		$(".hamburger").click(function()
		{
    		$(this).toggleClass("is-active");
    		$('.settings_panel').toggleClass('active');
  		});
	}

	function initClass()
	{
		var classDropdown = $('#healer_class_dropdown');
		//When class dropdown changes clear spell dropdowns and add seleced class spells
		classDropdown.change(function(e, a)
		{
			var selectedClass = classDropdown.find(':selected').val();
			clearSpells();
			var spellCount = 0;
			$.each(spells, (function(val, text)
			{
				var spell = text.class;
				if(spell === selectedClass)
				{
					if(spellCount === 0)
					{
						$('#left_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_left_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#right_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_right_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#middle_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
						$('#shift_middle_mouse_button').append($('<option selected></option>').val(text.name).html(text.name));
					}

					$('#left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_left_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#right_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_right_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#middle_mouse_button').append($('<option></option>').val(text.name).html(text.name));
					$('#shift_middle_mouse_button').append($('<option></option>').val(text.name).html(text.name));

					spellCount++;
				}
			}));

			// Handle Cooldowns
			$('#cooldown1').find('option').remove();
			$('#cooldown2').find('option').remove();
			cooldown1 = "";
			cooldown2 = "";

			var cooldownCount = 0;
			$.each(cooldowns, function(val, text)
			{
				if(text.class.indexOf(selectedClass) >= 0)
				{
					if(cooldownCount === 0)
					{
						$('#cooldown1').append($('<option selected></option>').val(text.name).html(text.name));
						$('#cooldown2').append($('<option selected></option>').val(text.name).html(text.name));
					}
					else
					{
						$('#cooldown1').append($('<option></option>').val(text.name).html(text.name));
						$('#cooldown2').append($('<option></option>').val(text.name).html(text.name));
					}
					cooldownCount++;
				}
			});

			initSpells();
		});
	}

	function clearSpells()
	{
		$('#left_mouse_button').find('option').remove();
		$('#right_mouse_button').find('option').remove();
		$('#middle_mouse_button').find('option').remove();
		$('#shift_left_mouse_button').find('option').remove();
		$('#shift_right_mouse_button').find('option').remove();
		$('#middle_right_mouse_button').find('option').remove();
	}

	function initSpells()
	{
		var lmb_val = $('#left_mouse_button').val();
		var rmb_val = $('#right_mouse_button').val();
		var mmb_val = $('#middle_mouse_button').val();
		var shift_lmb_val = $('#shift_left_mouse_button').val();
		var shift_rmb_val = $('#shift_right_mouse_button').val();
		var shift_mmb_val = $('#shift_middle_mouse_button').val();
		var key1 = $('#cooldown1').val();
		var key2 = $('#cooldown2').val();
		healingPower = $('.healing_input').val();
		crit = $('.crit_input').val();

		$.each(spells, function(i, s)
		{
			if(s.name === lmb_val)
			{
				lmb_spell = s;
			}
			if(s.name === rmb_val)
			{
				rmb_spell = s;
			}
			if(s.name === mmb_val)
			{
				mmb_spell = s;
			}
			if(s.name === shift_lmb_val)
			{
				shift_lmb_spell = s;
			}
			if(s.name === shift_rmb_val)
			{
				shift_rmb_spell = s;
			}
			if(s.name === shift_mmb_val)
			{
				shift_mmb_spell = s;
			}
		});

		var apply = $('.apply_spells');
		apply.on('click', function()
		{
			if(apply.hasClass('active'))
			{
				lmb_val = $('#left_mouse_button').val();
				rmb_val = $('#right_mouse_button').val();
				mmb_val = $('#middle_mouse_button').val();
				shift_lmb_val = $('#shift_left_mouse_button').val();
				shift_rmb_val = $('#shift_right_mouse_button').val();
				shift_mmb_val = $('#shift_middle_mouse_button').val();
				healingPower = $('.healing_input').val();

				$.each(spells, function(i, s)
				{
					if(s.name === lmb_val)
					{
						lmb_spell = s;
					}
					if(s.name === rmb_val)
					{
						rmb_spell = s;
					}
					if(s.name === mmb_val)
					{
						mmb_spell = s;
					}
					if(s.name === shift_lmb_val)
					{
						shift_lmb_spell = s;
					}
					if(s.name === shift_rmb_val)
					{
						shift_rmb_spell = s;
					}
					if(s.name === shift_mmb_val)
					{
						shift_mmb_spell = s;
					}
				});
			}	
		});
	}

	function initButton()
	{
		$('select').change(function()
		{
			$('.apply_spells').addClass('active');
		});

		$('input').on('change paste keyup', function()
		{
			$('.apply_spells').addClass('active');
			sim_timer_default = $('.sim_timer').val();
		});

		$('.apply_spells').on('click', function()
		{
			$('.apply_spells').removeClass('active');
			sim_timer_default = $('.sim_timer').val();
		});
	}

	/* 

	2. Init Healing Frame

	*/

	function initHealingFrame()
	{
		for(var x = 0; x < raid_size; x++)
		{
			var newPanel = '<div class="h_panel d-flex flex-row '+ players[x].class +'"><div class="health_overlay"><div class="incoming_container d-flex flex-row"></div></div><span>'+ players[x].name +'</span></div>';
			healing_frame.append(newPanel);

			$('.h_panel').bind('contextmenu', function(e)
			{
				return false;
			});
		}
		panels = $('.h_panel');

		// Spells/Keybinds
		$('.h_panel').on('mousedown', function(event)
		{
			console.log(healingPower);
			event.stopPropagation();
			event.stopImmediatePropagation();
			var pnl = $(this);
			var i = $(this).index();
			var healAmount;
			var castTime;
			var fullSpell;
			var isShift = event.shiftKey;

			if(players[i].status === "alive" && isRunning)
			{
				// What mouse button is pressed
				switch(event.which)
				{
					// Left Mouse Button
					case 1:
						if(isShift) fullSpell = shift_lmb_spell;
						else fullSpell = lmb_spell;
					break;

					// Middle Mouse Button
					case 2:
						if(isShift) fullSpell = shift_mmb_spell;
						else fullSpell = mmb_spell;
					break;

					// Right Mouse Button
					case 3:
						if(isShift) fullSpell = shift_rmb_spell;
						else fullSpell = rmb_spell;
					break;
				}
				castingSpell = fullSpell.name;
				castTime = fullSpell.castTime;
				initHeal(pnl, i, fullSpell);
			}
		});
	}

	/* 

	4. Init Fight

	*/

	function initFight()
	{
		start.on('click', function()
		{
			if(!isRunning)
			{
				isRunning = true;
				startMainTimer();
				playerClass = $('#healer_class_dropdown').val();
				maxMana = $('#mana').val();
				mana = maxMana;
				handle_main_timeout();
				
				startAIHealing();
				initHealingStats();
				bossPickTarget();
				initMp5();
				$.each(boss_abilities, function(x, val)
				{
					var selected_boss = $('#bosses').val();
					if(val.bossname === selected_boss)
					{
						setTimeout(function()
						{
							startAbilityInterval(val)
						}, val.delay * 1000);
					}
				});
			}
			else
			{
				clearTimeout(main_timeout);
				clearInterval(warning_interval);
				clearInterval(meleeTargetInterval);
				clearInterval(singleTargetInterval);
				clearInterval(allTargetsInterval);
				clearInterval(multiTargetInterval);
				clearInterval(healing_interval);
				clearInterval(mp5_interval);
				clearInterval(mp5_global);
				clearInterval(main_interval);
				isRunning = false;
			}
		});
	}

	function startMainTimer()
	{
		var fight_progress = $('.fight_progress');
		var fight_progress_text = $('.fight_percent');
		var temp_secs = 0;
		main_interval = setInterval(function()
		{
			if(secs > 0 && isRunning)
			{
				var hps = Math.floor(playerHealingDone / (secs/10));
				$('.player_hps').text(hps.toString() + "HPS");
				var fight_percent = (((sim_timer_default - (secs / 10)) / sim_timer_default) * 100);
				fight_progress.width(fight_percent + "%");
				fight_progress_text.text(Math.floor(fight_percent) + "%");
				sim_timer = sim_timer_default - (secs / 10);
			}
			secs++;
			temp_secs++;
		}, 100);
	}

	function handle_main_timeout()
	{
		main_timeout = setTimeout(function()
		{
			clearInterval(warning_interval);
			clearInterval(meleeTargetInterval);
			clearInterval(singleTargetInterval);
			clearInterval(allTargetsInterval);
			clearInterval(multiTargetInterval);
			clearInterval(healing_interval);
			clearInterval(mp5_interval);
			clearInterval(mp5_global);
			clearInterval(main_interval);
			isRunning = false;
		}, sim_timer * 1000);
	}

	function startWarning(val)
	{
		var warnings_container = $('.warnings_container');
		var warning_class = val.name.replace(/ /g, '_').toLowerCase();
		var new_warning_div = '<div class="warning '+ warning_class +'"><div>'+ val.name +'</div><div class="warning_progress"></div></div>';
		warnings_container.append(new_warning_div);
		var warning_div = $('.' + warning_class);
		var warning_progress = warning_div.find('.warning_progress');
		warning_progress.animate(
		{
			width: '100%',
			easing: 'linear'
		}, 10000, function()
		{
			warning_div.remove();
		});
	}

	function removeWarnings()
	{
		$('.warning').remove();
	}

	// Handle abilities
	function startAbilityInterval(val)
	{
		var targetCount = val.targets;
		var targetRole = val.targetRole;
		var warning = val.warning;
		if(warning)
		{
			setTimeout(function()
			{
				warning_interval = setInterval(function()
				{
					startWarning(val);
				}, val.time * 1000);
				startWarning(val);
			}, (val.time - 10) * 1000);
		}

		// Single target melee
		if(targetCount === 1 && val.name === "melee")
		{
			meleeTargetInterval = setInterval(function()
			{
				if(target !== "")
				{
					if(targetRole === "mt")
					{
						// Hit check
						var avo = target.avoidance;
						var hit = isHit(avo);
						var bossDmg = val.dmg;
						// var bossCrit = val.crit;
						if(hit)
						{
							// if(isAttackCrit(bossCrit))
							// {
							// 	bossDmg = bossDmg * 2;
							// }
							var hp = target.health - bossDmg;
							target.health = hp;
							output.prepend(target.name + " takes "+ bossDmg + "damage from " + val.name + "!" + "\n");

							if(target.health > 0)
							{
								updatePanels(target);
							}
							else
							{
								target.status = "dead";
								target.health = 0;
								updatePanels(target);
								target = "";
								bossPickTarget();
								clearInterval();
							}
							updatePanels(target);
						}
						else
						{
							output.prepend(target.name + " takes "+ bossDmg + "damage from " + val.name + "!" + "\n");
							output.prepend(val.name + " miss " + target.name + "\n");
						}
					}	
				}
					
			}, val.time*1000);
		}

		// Single Target but not melee
		else if(targetCount === 1 && val.name !== "melee")
		{
			var targets;
			singleTargetInterval = setInterval(function()
			{
				var targetCount = val.targets;
				var alivePlayersCount = getAlivePlayersCount();

				if(alivePlayersCount > 0)
				{
					if(alivePlayersCount < targetCount)
					{
						targetCount = alivePlayersCount;
					}
					var selected = getTargets(targetCount)
					$.each(selected, function(a, b)
					{
						var plr = b;
						var hp = plr.health - val.dmg;
						plr.health = hp;
						output.prepend(plr.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

						if(plr.health > 0)
						{
							updatePanels(plr);
						}
						else
						{
							plr.status = "dead";
							plr.health = 0;
							updatePanels(plr);
							plr = "";
							bossPickTarget();
							clearInterval();
						}
						updatePanels(plr);
					});
				}
				else
				{
					clearInterval(singleTargetInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}	
				
			}, val.time*1000);
		}

		// All targets
		else if(targetCount === "all")
		{
			allTargetsInterval = setInterval(function()
			{
				var c = getAlivePlayersCount();
				if(c > 0)
				{
					$.each(players, function(x, player)
					{
						if(player.status === "alive")
						{
							var hp = player.health - val.dmg;
							player.health = hp;
							output.prepend(player.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");
							if(player.health > 0)
							{
								updatePanels(player);
							}
							else
							{
								player.status = "dead";
								player.health = 0;
								updatePanels(player);
							}
							updatePanels(player);
						}
					});
				}
				else
				{
					clearInterval(allTargetsInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}
			}, val.time*1000);
		}
		// Multi target
		else
		{
			var targets;
			multiTargetInterval = setInterval(function()
			{
				var targetCount = val.targets;
				var alivePlayersCount = getAlivePlayersCount();

				if(alivePlayersCount > 0)
				{
					if(alivePlayersCount < targetCount)
					{
						targetCount = alivePlayersCount;
					}
					var selected = getTargets(targetCount)
					$.each(selected, function(a, b)
					{
						var plr = b;
						var hp = plr.health - val.dmg;

						// Check if dmg is in %
						var xxx = val.dmg.toString();
						var dmgPerc = 0;
						if(xxx.indexOf("%") >= 0)
						{
							dmgPerc = parseInt(xxx.split('%')[0]);
							console.log(dmgPerc);
						}

						// If dmg is in %
						if(dmgPerc > 0)
						{
							hp = plr.health - ((plr.health * dmgPerc) / 100);
						}
						
						plr.health = hp;
						output.prepend(plr.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");

						if(plr.health > 0)
						{
							updatePanels(plr);
						}
						else
						{
							plr.status = "dead";
							plr.health = 0;
							updatePanels(plr);
							plr = "";
							bossPickTarget();
							clearInterval();
						}
						updatePanels(plr);
					});
				}
				else
				{
					clearInterval(multiTargetInterval);
					clearInterval(warning_interval);
					removeWarnings();
				}	
				
			}, val.time*1000);
		}
	}

	function isHit(avo)
	{
		var rnd = Math.floor((Math.random() * 100) + 1);
		var returnValue = false;
		if(rnd <= avo)
		{
			returnValue = false
		}
		else
		{
			returnValue = true
		}
		return returnValue;
	}

	function isAttackCrit(bossCrit)
	{
		var rnd = Math.floor((Math.random() * 100) + 1);
		var returnValue = false;
		if(rnd <= bossCrit)
		{
			returnValue = false
		}
		else
		{
			returnValue = true
		}
		return returnValue;
	}

	function processDmg(p, val)
	{
		var hp = p.health - val.dmg;
		p.health = hp;
		output.prepend(p.name + " takes "+ val.dmg + "damage from " + val.name + "!" + "\n");
		updatePanels(p);
	}

	function getAlivePlayersCount()
	{
		var retValue = 0;
		$.each(players, function(x, player)
		{
			if(player.status === "alive")
			{
				retValue++;
			}
		});
		return retValue;
	}

	function getTargets(t)
	{
		var isAlive = [];
		var isAliveId = [];
		$.each(players, function(x, val)
		{
			if(val.status === "alive")
			{
				isAlive.push(val);
				isAliveId.push(val.id);
			}
		});
		
		var arr = [];
		var a = isAlive.length;
		while(arr.length < isAlive.length)
		{
		    var r = Math.floor(Math.random() * a - 1) + 1;
		    if(arr.indexOf(r) === -1) arr.push(r);
		}

		var returnArr = [];
		for(var yyy = 0; yyy < t; yyy++)
		{
			var yNum = arr[yyy];
			returnArr.push(isAlive[yNum]);
		}

		return returnArr;
	}

	function updatePanels(tgt)
	{
		var i = tgt.id;
		var health = tgt.health;
		var healthMax = tgt.healthMax;
		var healthPerc;
		if(health === 0)
		{
			healthPerc = 0;
		}
		else
		{
			healthPerc = ((health / healthMax) * 100) + "%";
		}
		$(panels[i]).find('.health_overlay').css('width', healthPerc);
	}

	function bossPickTarget()
	{
		if(target === "")
		{
			getMT();
		}
		if(target === "")
		{
			getTank();
		}
		if(target === "")
		{
			getNextTarget();
		}
	}

	function getMT()
	{
		$.each(players, function(x, val)
		{
			if(val.role === "mt" && val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	function getTank()
	{
		$.each(players, function(x, val)
		{
			if(val.role === "tank" && val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	// If MT and tanks are dead pick next random target for boss (not random atm, just next alive target)
	function getNextTarget()
	{
		$.each(players, function(x, val)
		{
			if(val.status === "alive")
			{
				target = val;
				return false;
			}
		});
	}

	function initHeal(pnl, i, fullSpell)
	{
		if(!isCasting)
		{
			if(mana > fullSpell.mana)
			{
				// isCasting = true;

				if(scrollsOfBlindingLightActive)
				{
					castTime = (((castTime / 1000) / ((33 / 100) + 1)) * 1000);
				}

				var pnls = pnl;

				// If spell is aoe, get all heal targets
				if(fullSpell.id === "PoH") pnls = [$($('.h_panel')[15]), $($('.h_panel')[16]), $($('.h_panel')[17]), $($('.h_panel')[18]), $($('.h_panel')[19])];

				if(fullSpell.id == "RN")
				{
					addHot(pnl, i, fullSpell, true);
				}
				else if(fullSpell.id == "LB")
				{
					initLifebloom(pnl, i, fullSpell);
				}
				else
				{
					startCasting(pnl, fullSpell);
				}
			}	
		}
	}

	function showIncomingHeal(pnl, pnls, healAmount, tempMaxHealth)
	{

		if(pnls != null)
		{
			$.each(pnls, function()
			{
				var p = $(this);
				var incContainer = p.find('.incoming_container');
				incContainer.append('<div class="incoming player_incoming"></div>');
				var inc = incContainer.find('.player_incoming');
				var incPerc = (((healAmount / tempMaxHealth) * 50) + "%");
				inc.css('width', incPerc);
			});
		}
		else
		{
			var incContainer = $(pnl).find('.incoming_container');
			incContainer.append('<div class="incoming player_incoming"></div>');
			var inc = incContainer.find('.player_incoming');
			var incPerc = (((healAmount / tempMaxHealth) * 50) + "%");
			inc.css('width', incPerc);
		}
			
	}

	function startCasting(pnl, fullSpell)
	{
		var num = 0;
		var i = $(pnl).index();
		var player = players[i];
		var crt = isCrit();
		var manaCost = fullSpell.mana;
		var castTime = fullSpell.castTime;
		var cTime = (castTime / 1000).toFixed(2) + "s";
		var tempMaxHealth = player.healthMax;
		var healAmount = getHealAmount(fullSpell, "player");
		var pnls = null;
		if(fullSpell.id === "PoH")
		{
			pnls = [$($('.h_panel')[15]), $($('.h_panel')[16]), $($('.h_panel')[17]), $($('.h_panel')[18]), $($('.h_panel')[19])];
		}
		if(fullSpell.id === "CoH")
		{
			var coh_index = pnl.index() + 1;
			var coh_group = Math.ceil(coh_index / 5) - 1;
			pnls = [$($('.h_panel')[coh_group * 5]), $($('.h_panel')[(coh_group * 5) + 1]), $($('.h_panel')[(coh_group * 5) + 2]), $($('.h_panel')[(coh_group * 5) + 3]), $($('.h_panel')[(coh_group * 5) + 4])];
		}
		var incContainer = $(pnl).find('.incoming_container');
		showIncomingHeal(pnl, pnls, healAmount, tempMaxHealth);

		$('.cast_bar_progress').animate(
		{
			width: '100%'
		},
		{
			duration: castTime,
			easing: 'linear',
			start: function()
			{
				isCasting = true;
				$('.cast_bar').css({background: '#000000'});
				$('.cast_bar_text').text("Casting " + castingSpell + " - " + cTime);
			},
			step: function()
			{
				
			},
			// Cancel Cast
			progress: function()
			{
				if(isCancelled || player.status !== "alive")
				{
					$('.cast_bar_progress').css({width: 0});
					$('.cast_bar_text').text("");
					$('.cast_bar').css({background: 'transparent'});
					isCasting = false;
					if(pnls != null)
					{
						$.each(pnls, function()
						{
							var p = $(this);
							p.find('.player_incoming').remove();
						});
					}
					else
					{
						incContainer.find('.player_incoming').remove();
					}
					
					$(this).stop(false, false);
					isCancelled = false;
				}
			},
			complete: function()
			{
				isCasting = false;
				$('.cast_bar_progress').css({width: 0});
				if(player.status === "alive")
				{
					if(pnls != null)
					{
						$.each(pnls, function()
						{
							healComplete(players[$(this).index()], healAmount, fullSpell);
						});
					}
					else
					{
						healComplete(player, healAmount, fullSpell);
					}

					if(fullSpell.id == "CoH")
					{
						isCasting = true;
						setTimeout(function()
						{
							isCasting = false;
						}, 1500);
					}

					// Reduced mana cost for paladin crits (--todo - fix to add mana after cast instead)
					if(playerClass === "paladin" && crt)
					{
						mana = mana - ((60 * manaCost) / 100);
						updateMana();
					}
					else
					{
						mana = mana - manaCost;
						updateMana();
					}
					
					clearInterval(mp5_global);
					startMp5Rule();

					if(pnls != null)
					{
						$.each(pnls, function()
						{
							var p = $(this);
							p.find('.player_incoming').remove();
						});
					}
					else
					{
						incContainer.find('.player_incoming').remove();
					}
				}
					
			}
		})
		.animate(
			{
				width: '0%'
			},
			{
				duration: 0
			});
		num++;
	}

	function healComplete(player, healAmount, fullSpell)
	{
		var currentHealth = player.health;
		var maxHealth = player.healthMax;
		var overheal = 0;
		var actualHealAmount = 0;
		var originalHealAmount = healAmount; // save original heal amount
		var crt = isCrit();
		if(crt) healAmount = healAmount * 1.5;
		var newHealth = currentHealth + healAmount;
		if(newHealth > maxHealth)
		{
			overheal = newHealth - maxHealth;
			actualHealAmount = healAmount - overheal;
			newHealth = maxHealth;
		}
		else
		{
			actualHealAmount = Math.ceil(healAmount);
			newHealth = currentHealth + healAmount;
		}

		playerHealingDone = playerHealingDone + actualHealAmount;
		players[19].healingDone = playerHealingDone;
		player.health = newHealth;
		updatePanels(player);

		// Chain heal
		if(fullSpell.id == "CH")
		{
			var tempHealAmount = healAmount;

			for(var p = 0; p < 2; p++)
			{
				var tempCrit = isCrit();
				var chainTarget = getHealTarget();
				var tempCurrentHealth = chainTarget.health;
				var tempMaxHealth = chainTarget.healthMax;
				var tempOverheal = 0;
				tempHealAmount = originalHealAmount / 2;
				if(tempCrit)
				{
					tempHealAmount = tempHealAmount * 1.5;
				}
				var tempNewHealth = tempCurrentHealth + tempHealAmount;

				if(tempNewHealth > maxHealth)
				{
					tempOverheal = tempNewHealth - tempMaxHealth;
					tempHealAmount = healAmount - tempOverheal;
					tempNewHealth = tempMaxHealth;
				}
				else
				{
					tempHealAmount = Math.ceil(tempHealAmount);
					tempNewHealth = tempCurrentHealth + tempHealAmount;
				}

				console.log(chainTarget);
				console.log(tempHealAmount);

				chainTarget.health = tempNewHealth;
				playerHealingDone = playerHealingDone + tempHealAmount;
				updatePanels(chainTarget);

				actualHealAmount = actualHealAmount + tempHealAmount
			}
		}

		showMyHeal(actualHealAmount, healAmount);
		var outputLine = "";
		if(!crt)
		{
			outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
		}
		else
		{
			outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
		}
		$('.cast_bar_text').text("");
		$('.cast_bar').css({background: 'transparent'});
		if(overheal > 0)
		{
			output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
		}
		else
		{
			output.prepend(outputLine + "\n");
		}
	}

	function getHealAmount(spell, healer)
	{
		var min = spell.min;
		var max = spell.max;
		var coef;
		var healerHealingPower;
		var bonusHealing;
		var avg;
		var healAmount;
		var returnHeal;
		var crt;

		if(healer === "player")
		{
			healerHealingPower = parseInt(healingPower);
		}
		else
		{
			healerHealingPower = parseInt(healer.healingPower);
		}

		// If spell is Flash of Light
		if(spell.id == "FoL")
		{
			// Apply healing light talent (+12% bonus healing to base values)
			min = min + ((min * 12) / 100);
			max = max + ((max * 12) / 100);
			coef = spell.coef;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			// crt = isCrit();
			// if(crt)
			// {
			// 	healAmount = healAmount * 1.5;
			// }
			// Blessing of Light
			healAmount = healAmount + 115;
			returnHeal = healAmount;
		}

		// If spell is Holy Light
		if(spell.id == "HL")
		{
			coef = spell.coef;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			// Blessing of Light
			healAmount = healAmount + 400;
			returnHeal = healAmount;
		}

		// If spell is Flash Heal
		if(spell.id == "FH")
		{
			coef = 0.4285;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Greater Heal
		if(spell.id == "GH")
		{
			coef = 0.8571;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Renew
		if(spell.id == "RN")
		{
			coef = 1;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Prayer of Healing
		if(spell.id == "PoH")
		{
			coef = 0.2857;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Circle of Healing
		if(spell.id == "CoH")
		{
			coef = 0.4;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Chain Heal
		if(spell.id == "CH")
		{
			coef = 0.7143;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Lesser Healing Wave
		if(spell.id == "LHW")
		{
			coef = spell.coef;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Healing Wave
		if(spell.id == "HW")
		{
			coef = spell.coef;
			bonusHealing = Math.ceil(healerHealingPower * coef);
			avg = Math.ceil(Math.random() * (max - min + 1) + min);
			healAmount = avg + bonusHealing;
			returnHeal = healAmount;
		}

		// If spell is Lifebloom
		if(spell.id == "LB")
		{
			coef =  0.784;
			bonusHealing = Math.ceil((healerHealingPower * coef) / 7);
			healAmount = bonusHealing;
			returnHeal = healAmount;
		}

		return returnHeal;
	}

	function isCrit()
	{
		var retValue = false;
		var rnd = Math.floor(Math.random() * 101);
		if(rnd <= crit)
		{
			retValue = true;
		}
		return retValue;
	}

	// Renew
	function addHot(pnl, i, fullSpell, gcd)
	{
		var player = players[i];
		if(player.status === "alive")
		{
			// Create hot icon and add it to the panel if hot does not already exist
			var healAmount = getHealAmount(fullSpell ,"player");
			var hotClass = 'hot';
			var hotName = fullSpell.name.split(' ')[0].toLowerCase();
			
			healAmount = Math.ceil(healAmount / (fullSpell.duration / fullSpell.interval));
			if($(pnl).find('.' + hotName).length > 0)
			{
				isCasting = true;
				setTimeout(function()
				{
					isCasting = false;
				}, 1500);
			}
			else
			{
				if(gcd)
				{
					isCasting = true;
					setTimeout(function()
					{
						isCasting = false;
					}, 1500);
				}
				var hotIcon = '<div class="' + hotClass + ' ' + hotName + '"></div>';
				$(pnl).append(hotIcon);
				setTimeout(function()
				{
					pnl.find('.' + hotName).remove();
				}, fullSpell.duration * 1000);

				var manaCost = fullSpell.mana;
				var tempMaxHealth = player.healthMax;
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var pnl2 = pnl.find('.incoming_container');
				var incID = getRandomNum();
				var incDivClass = "incoming" + incID.toString();
				var incDivClassFinal = "incoming "+incDivClass;
				var incDiv = '<div class="' + incDivClassFinal +'"></div>';
				var incDivToRemove;
				pnl2.append(incDiv);
				var inc = pnl2.find('.'+incDivClass);
				incDivToRemove = inc;
				var incPerc = (((healAmount / tempMaxHealth) * 50) + "%");
				inc.css('width', incPerc);

				//Mana - do not subtract if greater heal
				if(gcd)
				{
					mana = mana - manaCost;
					updateMana();
					clearInterval(mp5_global);
					startMp5Rule();
				}

				// HoT interval
				var hotInterval = setInterval(function()
				{
					if(player.status === "alive" && isRunning)
					{
						tempMaxHealth = player.healthMax;
						currentHealth = player.health;
						maxHealth = player.healthMax;
						var overheal = 0;
						var actualHealAmount = 0;
						var newHealth = currentHealth + healAmount;
						if(newHealth > maxHealth)
						{
							overheal = newHealth - maxHealth;
							actualHealAmount = healAmount - overheal;
							newHealth = maxHealth;
						}
						else
						{
							actualHealAmount = healAmount;
							newHealth = currentHealth + healAmount;
						}

						playerHealingDone = playerHealingDone + actualHealAmount;
						players[19].healingDone = playerHealingDone;
						player.health = newHealth;
						updatePanels(player);
						showMyHeal(actualHealAmount, healAmount);
						var isCrit = healAmount;
						var outputLine = "";
						if(!isCrit)
						{
							outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
						}
						else
						{
							outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
						}
						if(overheal > 0)
						{
							output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
						}
						else
						{
							output.prepend(outputLine + "\n");
						}

						// Remove incoming heal
						setTimeout(function()
						{
							incDivToRemove.remove();
						}, fullSpell.interval * 1000);
					}
					else
					{
						incDivToRemove.remove();
					}

						
				}, fullSpell.interval * 1000);

				// Clear Interval
				setTimeout(function()
				{
					clearInterval(hotInterval);
				}, fullSpell.duration * 1000);
			}
		}	
	}

	// Lifebloom
	function initLifebloom(pnl, i, fullSpell)
	{
		var player = players[i];
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = lb_container.find('.stacks').text();
		var lb_interval;
		var lb_timeout;
		var asd = "lb_" + $.now();
		

		if(!isCasting)
		{
			if(player.status === "alive")
			{
				// Start GCD
				isCasting = true;
				setTimeout(function()
				{
					isCasting = false;
				}, 1500);

				if(i === 0)
				{
					clearInterval(lb_interval_0);
					lb0(pnl, player, i, fullSpell);
				}
				else if(i === 1)
				{
					clearInterval(lb_interval_1);
					lb1(pnl, player, i, fullSpell);
				}
				else if(i === 2)
				{
					clearInterval(lb_interval_2);
					lb2(pnl, player, i, fullSpell);
				}
				else if(i === 3)
				{
					clearInterval(lb_interval_3);
					lb3(pnl, player, i, fullSpell);
				}
				else if(i === 4)
				{
					clearInterval(lb_interval_4);
					lb4(pnl, player, i, fullSpell);
				}
				else if(i === 5)
				{
					clearInterval(lb_interval_5);
					lb5(pnl, player, i, fullSpell);
				}
			}	
		}
	}

	function getRandomNum()
	{
		var x = Math.floor(1000 + Math.random() * 9000);

		return x;
	}

	function showMyHeal(heal, crit)
	{
		var critClass = "";
		if(crit)
		{
			critClass = "crit";
		}
		var newDiv = '<div class="show_my_heal '+ critClass +'">'+ heal +'</div>';
		
		$('.show_my_heal_container > div').append(newDiv);
		var newElement = $('.show_my_heal')[$('.show_my_heal').length - 1];
		$(newElement).animate(
		{
			bottom: '100%',
			opacity: '0'
		}, 3000, "linear",
			function()
			{
				$(newElement).remove();
			}
		);
	}

	/* 

	2. Init AI

	*/

	function initAI()
	{
		healers = getHealers();
	}

	function getHealers()
	{
		var healers = [];
		$.each(players, function()
		{
			if(this.role === "healer")
			{
				healers.push(this);
			}
		});
		return healers;
	}

	function startAIHealing()
	{
		$.each(healers, function(e, i)
		{
			if(i.name !== "Player")
			{
				initHealer(e, i);
			}
		});
	}

	function initHealer(e, i)
	{
		var hClass = i.class;
		var reaction = i.reaction;
		var healTarget = "";

		healing_interval = setInterval(function()
		{
			if(i.isHealing === false && i.status === "alive" && isRunning)
			{
				if(i.name === "Parsegod")
				{
					healTarget = getHealTargetAILevel10();
				}
				else
				{
					if(i.focus === "mt")
					{
						healTarget = target;
					}
					else
					{
						healTarget = getHealTarget();
					}
				}

				if(healTarget !== "")
				{
					var pnl = panels.get(healTarget.id);
					var targetID = healTarget.id;
					if(i.name === "Parsegod")
					{
						var spell = aiPickSpellLevel10(targetID);
					}
					else
					{
						var spell = aiPickSpell(targetID);
					}
					var s = spells.find(x => x.name === spell);
					var healAmount = getHealAmount(s, i);
					var castTime = s.castTime;
					i.isHealing = true;
					initAIHeal($(pnl), targetID, castTime, healAmount, i);
				}
			}
			
		}, reaction);
	}

	function getHealTarget()
	{
		var healingTargets = [];
		$.each(players, function(e, i)
		{
			if(i.status === 'alive' && i.health < i.healthMax)
			{
				healingTargets.push(i);
			}
		});
		var healingTarget = "";

		if(healingTargets.length > 0)
		{
			healingTarget = healingTargets[Math.floor(Math.random() * healingTargets.length)];
		}
		return healingTarget;
	}

	function getHealTargetAILevel10()
	{
		var healingTargets = [];
		$.each(players, function(e, i)
		{
			if(i.status === 'alive' && i.health < i.healthMax)
			{
				var missingHP = i.healthMax - i.health;
				var asd = {missingHP: missingHP};
				$.extend(i, asd);
				healingTargets.push(i);
			}
		});
		var healingTarget = "";

		if(healingTargets.length > 0)
		{
			healingTargets = healingTargets.sort(function (a, b)
			{
			    return b.missingHP - a.missingHP;
			});
			healingTarget = healingTargets[0];
		}
		return healingTarget;
	}

	function aiPickSpell(targetID)
	{
		// var targetHP = players[targetID].health;
		// var targetMissingHP = players[targetID].healthMax - targetHP;
		// var spell = "";
		// if(targetMissingHP > 1000)
		// {
		// 	spell = "Holy Light (Rank 6)";
		// }
		// else
		// {
		// 	spell = "Flash of Light (Rank 4)";
		// }
		// return spell;

		return "Flash of Light (Rank 7)";
	}

	function aiPickSpellLevel10(targetID)
	{
		var targetHP = players[targetID].health;
		var targetMissingHP = players[targetID].healthMax - targetHP;
		var spell = "";
		if(targetMissingHP > 2800)
		{
			spell = "Holy Light (Rank 9)";
		}
		else
		{
			spell = "Flash of Light (Rank 7)";
		}
		return spell;
	}

	function initAIHeal(pnl, targetID, castTime, healAmount, i)
	{
		var player = players[targetID];
		var tempMaxHealth = player.healthMax;
		var crit = isCrit();

		pnl = pnl.find('.incoming_container');
		var currentInc = 0;
		var incDivCount = pnl.find('.incoming').length;
		var incDivClass = "incoming"+incDivCount.toString();
		var incDivClassFinal = "incoming "+incDivClass;
		var incDiv = '<div class="' + incDivClassFinal +'"></div>';
		var incDivToRemove;

		pnl.append(incDiv);
		var inc = pnl.find('.'+incDivClass);
		incDivToRemove = inc;
		var incPerc = (((healAmount / tempMaxHealth) * 50) + "%");
		inc.css('width', incPerc);


		setTimeout(function()
		{
			var currentHealth = player.health;
			var maxHealth = player.healthMax;
			var overheal = 0;
			var actualHealAmount = 0;
			var newHealth = currentHealth + healAmount;
			if(player.status === "alive")
			{
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = healAmount - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = healAmount;
					newHealth = currentHealth + healAmount;
				}
				var healingSoFar = i.healingDone;
				i.healingDone = healingSoFar + actualHealAmount;
				player.health = newHealth;
				updatePanels(player);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by " + i.name;
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by " + i.name;
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n by" + i.name);
				}
				else
				{
					output.prepend(outputLine + "\n");
				}
				incDivToRemove.remove();
			}
			else
			{
				incDivToRemove.remove();
			}
			i.isHealing = false;
		}, castTime);	
	}

	function initHealingStats()
	{
		var healingOutputText = "";
		var player_h;
		setInterval(function()
		{
			healingOutputText = "";
			healers.sort((a, b) => parseFloat(b.healingDone) - parseFloat(a.healingDone));
			$.each(healers, function(e, i)
			{
				healingOutputText = healingOutputText + i.name + ": " + i.healingDone + "\n";
				healingStatsOutput.text(healingOutputText);
			});
		}, 1000);
	}

	function initMp5()
	{
		mp5_interval = setInterval(function()
		{
			mana = mana + mp5;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
		}, 5000);
	}

	function startMp5Rule()
	{
		if(playerClass === "priest")
		{
			mp5 = 250;
		}
		else
		{
			mp5 = 160;
		}
		mp5_global = setInterval(function()
		{
			if(playerClass === "priest")
			{
				mp5 = 520;
			}
			else
			{
				mp5 = 320;
			}
		}, 5000);
	}

	function updateMana()
	{
		$('.mana').text(mana);
		var manaPerc = (mana / maxMana) * 100;
		$('.mana_background').css("width", manaPerc + "%");
	}

	function initCDs()
	{
		manaPot.on('click', function()
		{
			var potMana = Math.floor(Math.random() * (2250 - 1350 + 1)) + 1350;
			potMana = potMana * 1.4;
			mana = mana + potMana;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
			manaPot.css("pointerEvents", "none");
			$('.mana_pot_cd').css("opacity", "1");
			var x = 120;
			var manaPotInterval = setInterval(function()
			{
				x--;
				$('.mana_pot_cd').text(x);
			}, 1000);
			setTimeout(function()
			{
				manaPot.css("pointerEvents", "auto");
				$('.mana_pot_cd').css("opacity", "0");
				clearInterval(manaPotInterval);
			},120000);
		});

		rune.on('click', function()
		{
			var runeMana = Math.floor(Math.random() * (1500 - 900 + 1)) + 900;
			mana = mana + runeMana;
			if(mana >= maxMana)
			{
				mana = maxMana;
			}
			updateMana();
			rune.css("pointerEvents", "none");
			$('.rune_cd').css("opacity", "1");
			var x = 120;
			var runeInterval = setInterval(function()
			{
				x--;
				$('.rune_cd').text(x);
			}, 1000);
			setTimeout(function()
			{
				rune.css("pointerEvents", "auto");
				$('.rune_cd').css("opacity", "0");
				clearInterval(runeInterval);
			},120000);
		});
	}

	function lb0(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_0);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_0 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_0);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

	function lb1(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_1);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_1 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_1);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

	function lb2(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_2);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_2 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_2);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

	function lb3(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_3);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_3 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_3);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

	function lb4(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_4);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_4 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_4);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

	function lb5(pnl, player, i, fullSpell)
	{
		var lb_timeout;
		var healAmount = getHealAmount(fullSpell, "player");
		var lb_container = $(pnl).find('.lifebloom_container');
		var lb_count = lb_container.length;
		var lb_stacks = 1;
		if(lb_count < 1)
		{
			lb_stacks = 1;
		}
		else
		{
			lb_stacks = parseInt(lb_container.find('.lb_stacks').text()) + 1;
			if(lb_stacks > 3)
			{
				lb_stacks = 3;
			}
		}
		var asd = "lb_" + $.now();
		var hotIcon = '<div class="lifebloom_container '+ asd +'"><div><div class="lb_stacks">' + lb_stacks + '</div><div class="lb_timer">6</div></div></div>';
		var crit = isCrit();

		clearInterval(lb_interval_5);
		lb_container.remove();
		$(pnl).append(hotIcon);

		lb_interval_5 = setInterval(function()
		{
			if(player.status === "alive" && isRunning)
			{
				var currentHealth = player.health;
				var maxHealth = player.healthMax;
				var overheal = 0;
				var actualHealAmount = 0;
				var c = 1;
				c = parseInt($(pnl).find('.lb_stacks').text());
				var t = parseInt($(pnl).find('.lb_timer').text()) - 1;
				$(pnl).find('.lb_timer').text(t);
				if(isNaN(c))
				{
					c = 1;
				}
				var hot = Math.ceil(healAmount * c);
				var newHealth = currentHealth + hot;
				if(newHealth > maxHealth)
				{
					overheal = newHealth - maxHealth;
					actualHealAmount = hot - overheal;
					newHealth = maxHealth;
				}
				else
				{
					actualHealAmount = hot;
					newHealth = currentHealth + hot;
				}
				playerHealingDone = playerHealingDone + actualHealAmount;
				players[19].healingDone = playerHealingDone;
				player.health = newHealth;
				updatePanels(player);
				showMyHeal(actualHealAmount, crit);
				var outputLine = "";
				if(!crit)
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " by Player";
				}
				else
				{
					outputLine = player.name + " got healed for " + actualHealAmount + " (Crit!) by Player";
				}
				if(overheal > 0)
				{
					output.prepend(outputLine + " (" + overheal + " overhealed)" + "\n  by Player");
				}
				else
				{
					output.prepend(outputLine + "\n");
				}

				if(t === -1)
				{
					$(pnl).find('.lifebloom_container').remove();
					clearInterval(lb_interval_5);

					var currentHealth2 = player.health;
					var maxHealth2 = player.healthMax;
					var overheal2 = 0;
					var actualHealAmount2 = 0;
					var healAmount2 = 600 * lb_stacks;
					if(crit)
					{
						healAmount2 = healAmount2 * 1.5;
					}
					var newHealth2 = currentHealth2 + healAmount2;
					if(newHealth2 > maxHealth2)
					{
						overheal2 = newHealth2 - maxHealth2;
						actualHealAmount2 = healAmount2 - overheal2;
						newHealth2 = maxHealth2;
					}
					else
					{
						actualHealAmount2 = Math.ceil(healAmount2);
						newHealth2 = currentHealth2 + healAmount2;
					}

					playerHealingDone = playerHealingDone + actualHealAmount2;
					players[19].healingDone = playerHealingDone;
					player.health = newHealth2;
					updatePanels(player);
					showMyHeal(actualHealAmount2, healAmount2);
				}
			}
			else
			{
				incDivToRemove.remove();
			}	
		}, fullSpell.interval * 1000);
	}

});