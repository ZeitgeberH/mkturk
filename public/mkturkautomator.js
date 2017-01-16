//============== UPDATESRTASK ============== UPDATESRTASK ============== UPDATESRTASK ============ //
function updateSRTask(writestr){

	var default_objectgrid = [2, 8, 0, 6] 
	function get_obj_grid(n){
		// Returns first n elements of default_objectgrid
		return default_objectgrid.slice(0, n)
	}

//============== 1-DEFINE TRAINING PHASES ================//
	function touch(mintrials){
		var vals = {
		stagename: 'touch',  // todo: log stagename as a meta field for each trial
		rewardStage: 0,
		fixationmove: 0, 
		fixationradius: 120,
		sampleON: 200, 
		keepSampleON: 0, 
		samplegrid: 4, 
		objectgrid: [2, 8], 
		imageFolderSample: 17, 
		nway: 1, 
		sampleScale: 0.75,
		testScale: 0.75,
		objectlist: [0, 1], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals
	}

	function movingtouch(mintrials){
		var vals = {stagename: 'movingtouch', 
		rewardStage: 0,
		fixationmove: 3000, // 
		fixationradius: 120,
		sampleON: 200, // ms - how long does the sample image stay on
		keepSampleON: 0, // Bool - keep it on forever?
		samplegrid: 4, // index of sample in a 3x3, down-right indexed grid starting at 1
		objectgrid: [2, 8], // array of indices for the response images of each object (indexed in same order as param "TestedObjects")
		imageFolderSample: 17, // reference to folder from where to get sample (stimulus) images
		nway: 1, 
		sampleScale: 0.75,
		testScale: 0.75,
		objectlist: [0, 1], 
		minpctcorrect: 80, // purely internal for state transition, it seems
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function nodistractorSR(mintrials, objectlist){
			// } = [0, 1]){
		var vals = {
		stagename: 'nodistractorSR', 
		rewardStage: 1,
		fixationmove: 0, // 
		fixationradius: 120,
		sampleON: 200, // ms - how long does the sample image stay on
		keepSampleON: 1, // Bool - keep it on forever?
		samplegrid: 4, // index of sample in a 3x3, down-right indexed grid starting at 1
		objectgrid: get_obj_grid(objectlist.length), // array of indices for the response images of each object (indexed in same order as param "TestedObjects")
		imageFolderSample: 17, // reference to folder from where to get sample (stimulus) images
		nway: objectlist.length, 
		sampleScale: 0.625,
		testScale: 0.625,
		objectlist: objectlist, 
		minpctcorrect: 75, // purely internal for state transition, it seems
		mintrials: mintrials,
		hidetestdistractors: 1
		}
		return vals
	}

	function spatialSR(mintrials, nway, objectlist){
		// nway = 1, objectlist = [0, 1]){
		var vals = {
		stagename: 'spatialSR'+nway.toString()+'ways', 
		rewardStage: 1,
		fixationmove: 0, // 
		fixationradius: 120,
		sampleON: 200, // ms - how long does the sample image stay on
		keepSampleON: 1, // Bool - keep it on forever?
		samplegrid: 4, // index of sample in a 3x3, down-right indexed grid starting at 1
		objectgrid: get_obj_grid(objectlist.length), // array of indices for the response images of each object (indexed in same order as param "TestedObjects")
		imageFolderSample: 17, // reference to folder from where to get sample (stimulus) images
		nway: nway, 
		sampleScale: 0.625,
		testScale: 0.625,
		objectlist: objectlist, 
		minpctcorrect: 75, // purely internal for state transition, it seems
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals
	}

	function delaySR(mintrials,nway,objectlist){
	// nway = 2, objectlist = [0,1]){
		var vals = {
		stagename: 'delaySR_2way'+nway.toString()+'ways', 
		rewardStage: 1,
		fixationmove: 0, 
		fixationradius: 120,
		sampleON: 500, 
		keepSampleON: 0, 
		samplegrid: 4, 
		objectgrid: get_obj_grid(objectlist.length), 
		imageFolderSample: 17, 
		nway: nway, 
		sampleScale: 0.625,
		testScale: 0.625,
		objectlist: objectlist, 
		minpctcorrect: 80, // purely internal for state transition, it seems
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals
	}

	function stageSR(minpctcorrect, mintrials, sample_foldernum, objectlist){
	// assumes nway = 2
	// C = criterion performance [0, 100]
		var nway = objectlist.length
		var vals = {
		stagename: 'SR'+nway.toString()+'ways', 
		rewardStage: 1,
		fixationmove: 0, 
		fixationradius: 60,
		sampleON: 100, 
		keepSampleON: 0, 
		samplegrid: 4, 
		objectgrid: get_obj_grid(objectlist.length), 
		imageFolderSample: sample_foldernum, 
		nway: nway, 
		sampleScale: 0.6262, // for 8degrees visual angle; 8inches viewing distance; 512x512 image; 287.51 dpi (samsung galaxy 10.5). 
		testScale: 0.55,
		objectlist: objectlist, 
		minpctcorrect: minpctcorrect, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals
	}


	var ntrials=500
	//// Define sequence of stages
	var phase_sequence = [touch(100), 
							 movingtouch(400), 
							 nodistractorSR(ntrials, [0, 3]), 
							 spatialSR(ntrials, 2, [0, 3]), 
							 spatialSR(ntrials, 3, [0, 3, 7]), 
							 spatialSR(ntrials, 4, [0, 3, 7, 5]), 
							 delaySR(ntrials, 4, [0, 3, 7, 5]),
							 nodistractorSR(ntrials, [1, 2]), 
							 spatialSR(ntrials, 2, [1, 2]), 
							 spatialSR(ntrials, 3, [1, 2, 4]), 
							 spatialSR(ntrials, 4, [1, 2, 4, 6]), 
							 delaySR(ntrials, 4, [1, 2, 4, 6]),
							 ]

	 

	 var phase_sequence = []
	 for (var phase_i = 0; phase_i<number_automator_stages; phase_i++){

	 	// Input arguments: minpctcorrect, mintrials, sample_foldernum, objectlist
	 	phase_sequence.push(stageSR(
	 		minpctcorrect_sequence[phase_i], 
	 		mintrials_sequence[phase_i], 
	 		sample_foldernum_sequence[phase_i], 
	 		objectlist_sequence[phase_i]));
	 }


	var trainingstages = {
		stagename: [],
		rewardStage: [],
		fixationmove: [],
		fixationradius: [],
		sampleON: [],
		keepSampleON: [],
		samplegrid: [],
		objectgrid: [],
		imageFolderSample: [],
		nway: [], 
		sampleScale: [],
		testScale: [],
		objectlist: [],
		minpctcorrect: [],
		mintrials: [],
		hidetestdistractors: [],
	}
	
	for (var i=0; i<=phase_sequence.length-1; i++){
		trainingstages.stagename[i]=trainingstages[i].stagename
		trainingstages.rewardStage[i]=phase_sequence[i].rewardStage
		trainingstages.fixationmove[i]=phase_sequence[i].fixationmove
		trainingstages.fixationradius[i]=phase_sequence[i].fixationradius
		trainingstages.sampleON[i]=phase_sequence[i].sampleON
		trainingstages.samplegrid[i]=phase_sequence[i].samplegrid
		trainingstages.objectgrid[i]=phase_sequence[i].objectgrid
		trainingstages.keepSampleON[i]=phase_sequence[i].keepSampleON
		trainingstages.nway[i]=phase_sequence[i].nway
		trainingstages.imageFolderSample[i]=phase_sequence[i].imageFolderSample
		trainingstages.sampleScale[i]=phase_sequence[i].sampleScale
		trainingstages.testScale[i]=phase_sequence[i].testScale
		trainingstages.objectlist[i]=phase_sequence[i].objectlist
		trainingstages.minpctcorrect[i]=phase_sequence[i].minpctcorrect
		trainingstages.mintrials[i]=phase_sequence[i].mintrials
		trainingstages.hidetestdistractors[i]=phase_sequence[i].hidetestdistractors
	}
//============== 1-DEFINE TRAINING PHASES (end) ================//

//============== 2-CHECK CURRENT STAGE ================//
	// Rather than implicitly inferring current training stage based on the state of params.txt, 
	// get current stage by looking at a new variable "currentAutomatorStage", specified in params file. 
	// Based on that parameter, update the rest of the params.txt file if there are discrepancies.
	trainingstages.current = trial.currentAutomatorStage; 

	var i = trainingstages.current
	if (trainingstages.rewardStage[i] == trial.rewardStage && 
		trainingstages.fixationmove[i] == trial.fixationmove && 
		trainingstages.fixationradius[i] == trial.fixationradius && 
		trainingstages.sampleON[i] == trial.sampleON && 
		trainingstages.samplegrid[i] == trial.samplegrid && 
		trainingstages.objectgrid[i].toString() == trial.objectgrid.toString() && 
		trainingstages.keepSampleON[i] == trial.keepSampleON && 
		trainingstages.nway[i] == trial.nway && 
		trainingstages.imageFolderSample[i] == trial.imageFolderSample && 
		trainingstages.sampleScale[i] == trial.sampleScale && 
		trainingstages.testScale[i] == trial.testScale && 
		trainingstages.hidetestdistractors[i] == trial.hidetestdistractors && 
		trainingstages.objectlist[i].toString() == trial.objectlist.toString())
		{
			//do nothing
		}

	else{
		// Current state of trial.[stuff] is incorrect; update parameters & reload images.
		trial.need2writeParameters=1;
		trial.automatorstagechange=1

		trial.rewardStage = trainingstages.rewardStage[i]
		trial.fixationmove = trainingstages.fixationmove[i]
		trial.fixationradius = trainingstages.fixationradius[i]
		trial.sampleON = trainingstages.sampleON[i]
		trial.samplegrid = [trainingstages.samplegrid[i]] // why is this in brackets?
		trial.objectgrid = trainingstages.objectgrid[i]
		trial.keepSampleON = trainingstages.keepSampleON[i]
		trial.nway = trainingstages.nway[i]
		trial.imageFolderSample = trainingstages.imageFolderSample[i]
		trial.sampleScale = trainingstages.sampleScale[i]
		trial.testScale = trainingstages.testScale[i]
		trial.hidetestdistractors = trainingstages.hidetestdistractors[i] 
		trial.objectlist = trainingstages.objectlist[i] //todo
		console.log('Automator updated trial.[stuff] because of discrepancy between automator and params.')
	}


	if (writestr == "readtaskstageonly"){
		return trainingstages.current;		
	}
//============== 2-CHECK CURRENT STAGE (end) ================//

//============== 3-COMPUTE PERFORMANCE ================//
	var startingindex = -1;
	for (var i = 0; i < trialhistory.trainingstage.length; i++){
		if (typeof(trialhistory.trainingstage[i]) == "undefined"){
			// Do nothing 
		}
		else if (
				trialhistory.trainingstage[i] == trainingstages.current 
				&& startingindex == -1 
				&& trialhistory.automator_filepath[i] == trial.automatorFilePath){ 
			startingindex = i;
		}
		else if (trialhistory.trainingstage[i] != trainingstages.current){ 
			startingindex = -1; 
		}
		else if (trialhistory.automator_filepath[i] != trial.automatorFilePath){ 
			startingindex = -1; 
		}
	}
	trialhistory.startingindex=startingindex

	var ntrial=0;
	var ncorrect=0;
	var pctcorrect
	if (startingindex == -1){
		pctcorrect = 0;
	}
	else{ //take running average
		var ncompleted = trialhistory.correct.length - startingindex;
		if (ncompleted > trainingstages.mintrials[trainingstages.current]){
			startingindex = trialhistory.correct.length - trainingstages.mintrials[trainingstages.current];
		}
		for (var i=startingindex; i<=trialhistory.correct.length-1; i++)
		{
			if (trialhistory.correct[i]==1){ncorrect++;}
			ntrial++;
		}
		pctcorrect = 100 * ncorrect/ntrial;
	}
	trialhistory.trainingstagename = trainingstages.stagename[trainingstages.current]
	trialhistory.pctcorrect = pctcorrect
	trialhistory.startingindex = startingindex
	trialhistory.ntrials_running = ntrial
	trialhistory.mintrials = trainingstages.mintrials[trainingstages.current]
	trialhistory.minpctcorrect = trainingstages.minpctcorrect[trainingstages.current]
//============== 3-COMPUTE PERFORMANCE (end) ================//

//============== 4-UPDATE STAGE ================//
	//Determine if updating stage and/or reward
	var updatingstage=0;

	if (pctcorrect >= trainingstages.minpctcorrect[trainingstages.current] && 
		ntrial >= trainingstages.mintrials[trainingstages.current] && 
		trainingstages.current < trainingstages.sampleON.length-1){
		updatingstage=1;
		trainingstages.current++;
	}

	if (updatingstage==1){

		// trial.need2loadParameters=1;
		trial.need2writeParameters=1;
		trial.automatorstagechange=1

		trial.currentAutomatorStage = trainingstages.current
		//update training stage
		trial.rewardStage = trainingstages.rewardStage[trainingstages.current]
		trial.fixationmove = trainingstages.fixationmove[trainingstages.current]
		trial.fixationradius = trainingstages.fixationradius[trainingstages.current]
		trial.sampleON = trainingstages.sampleON[trainingstages.current]
		trial.samplegrid = [trainingstages.samplegrid[trainingstages.current]] // why is this in brackets?
		trial.objectgrid = trainingstages.objectgrid[trainingstages.current]
		trial.keepSampleON = trainingstages.keepSampleON[trainingstages.current]
		trial.nway = trainingstages.nway[trainingstages.current]
		trial.imageFolderSample = trainingstages.imageFolderSample[trainingstages.current]
		trial.sampleScale = trainingstages.sampleScale[trainingstages.current]
		trial.testScale = trainingstages.testScale[trainingstages.current]
		trial.hidetestdistractors = trainingstages.hidetestdistractors[trainingstages.current] 
		trial.objectlist = trainingstages.objectlist[trainingstages.current] //todo
		console.log('Automator updated trial.[stuff] because of stage change')

		//update trial history
		trialhistory.trainingstagename = trainingstages.stagename[trainingstages.current]
		trialhistory.pctcorrect = 0
		trialhistory.startingindex = -1
		trialhistory.ntrials_running = 0
		trialhistory.mintrials = trainingstages.mintrials[trainingstages.current]
		trialhistory.minpctcorrect = trainingstages.minpctcorrect[trainingstages.current]
//============== 4-UPDATE STAGE (end) ================//
	}
	else{
		return
	}
}
//============== UPDATESRTASK ============== UPDATESRTASK ============== UPDATESRTASK ============ //

//============== UPDATEORTASK ============== UPDATEORTASK ============== UPDATEORTASK ============ //
function updateORTask(writestr){
// STAGES:
// (1a) touch
// (1b) movingtouch
// (1c) FRtouch
// (2a) spatialmatch
// (2b) delayedmatch
// (3a) var1match_set1
// (3b) var2match_set1
// (3c) var3match_set1
// (4a) var3match_set2
// (4b) var3match_set3
// (5) var3match_24obj

//============== 1-TRAINING PHASES ================//
	function touch(mintrials){
		var vals = {
		stagename: 'touch',  // todo: log stagename as a meta field for each trial
		rewardStage: 0,
		fixationmove: 0, 
		fixationScale: 2,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 2,
		sampleON: 200, 
		keepSampleON: 0,
		fixationgridindex: 4, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 0, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0, 1], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals
	}

	function movingtouch(mintrials){
		var vals = {
		stagename: 'movingtouch', 
		rewardStage: 0,
		fixationmove: 3000, //fixation dot changes location every 3 seconds
		fixationScale: 1.5,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1.5,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 4, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 0, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0, 1], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function frtouch(mintrials){
		var vals = {
		stagename: 'frtouch', 
		rewardStage: 0,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 1,
		fixedratio: 5,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 4, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 0, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function spatialmatch(mintrials){
		var vals = {
		stagename: 'spatialmatch', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 1,
		fixedratio: 5,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 1, 
		fixationgridindex: 4, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 0, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function delayedmatch(mintrials){
		var vals = {
		stagename: 'delayedmatch', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 1,
		fixedratio: 5,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 4, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 0, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function var1match_set1(mintrials){
		var vals = {
		stagename: 'var1match_set1', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 500, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 6, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function var2match_set1(mintrials){
		var vals = {
		stagename: 'var2match_set1', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 7, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function var3match_set1(mintrials){
		var vals = {
		stagename: 'var3match_set1', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 8, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}


	function var3match_set2(mintrials){
		var vals = {
		stagename: 'var3match_set2', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 8, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [8,9,10,11,12,13,14,15], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function var3match_set3(mintrials){
		var vals = {
		stagename: 'var3match_set3', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 8, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [16,17,18,19,20,21,22,23], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	function var3match_obj24(mintrials){
		var vals = {
		stagename: 'var3match_obj24', 
		rewardStage: 1,
		fixationmove: 0,
		fixationScale: 1,
		fixationusessample: 0,
		fixedratio: 1,
		ngridpoints: 3,
		gridscale: 1,
		sampleON: 200, 
		keepSampleON: 0, 
		fixationgridindex: 5, 
		samplegrid: 4, 
		objectgrid: [], 
		imageFolderSample: 8, 
		nway: 2, 
		sampleScale: 1,
		testScale: 1,
		objectlist: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 
		minpctcorrect: 80, 
		mintrials: mintrials,
		hidetestdistractors:0, 
		}
		return vals 
	}

	var ntrials=5
	//// Define sequence of stages
	var phase_sequence = [
				touch(ntrials), 
				movingtouch(ntrials),
				frtouch(ntrials),
				spatialmatch(ntrials),
				delayedmatch(ntrials),
				var1match_set1(ntrials),
				var2match_set1(ntrials),
				var3match_set1(ntrials),
				var3match_set2(ntrials),
				var3match_set3(ntrials),
				var3match_obj24(ntrials),
			]

	var trainingstages = {
		stagename: [],
		rewardStage: [],
		fixationmove: [],
		fixationScale: [],
		fixedratio: [],
		sampleON: [],
		keepSampleON: [],
		gridscale: [],
		fixationgridindex: [], 
		samplegrid: [],
		objectgrid: [],
		fixationusessample: [],
		imageFolderSample: [],
		nway: [], 
		sampleScale: [],
		testScale: [],
		objectlist: [],
		minpctcorrect: [],
		mintrials: [],
		hidetestdistractors: [],
	}
	
	for (var i=0; i<=phase_sequence.length-1; i++){
		trainingstages.stagename[i]=phase_sequence[i].stagename
		trainingstages.rewardStage[i]=phase_sequence[i].rewardStage
		trainingstages.fixationmove[i]=phase_sequence[i].fixationmove
		trainingstages.fixationScale[i]=phase_sequence[i].fixationScale
		trainingstages.fixedratio[i]=phase_sequence[i].fixedratio
		trainingstages.sampleON[i]=phase_sequence[i].sampleON
		trainingstages.gridscale[i]=phase_sequence[i].gridscale
		trainingstages.fixationgridindex[i]=phase_sequence[i].fixationgridindex
		trainingstages.samplegrid[i]=phase_sequence[i].samplegrid
		trainingstages.objectgrid[i]=phase_sequence[i].objectgrid
		trainingstages.fixationusessample[i]=phase_sequence[i].fixationusessample
		trainingstages.keepSampleON[i]=phase_sequence[i].keepSampleON
		trainingstages.nway[i]=phase_sequence[i].nway
		trainingstages.imageFolderSample[i]=phase_sequence[i].imageFolderSample
		trainingstages.sampleScale[i]=phase_sequence[i].sampleScale
		trainingstages.testScale[i]=phase_sequence[i].testScale
		trainingstages.objectlist[i]=phase_sequence[i].objectlist
		trainingstages.minpctcorrect[i]=phase_sequence[i].minpctcorrect
		trainingstages.mintrials[i]=phase_sequence[i].mintrials
		trainingstages.hidetestdistractors[i]=phase_sequence[i].hidetestdistractors
	}
//============== 1-TRAINING PHASES (end) ================//

//============== 2-CHECK CURRENT STAGE ================//
	// Rather than implicitly inferring current training stage based on the state of params.txt, 
	// get current stage by looking at a new variable "currentAutomatorStage", specified in params file. 
	// Based on that parameter, update the rest of the params.txt file if there are discrepancies.
	trainingstages.current = trial.currentAutomatorStage; 

	var i = trainingstages.current
	if (trainingstages.rewardStage[i] == trial.rewardStage && 
		trainingstages.fixationmove[i] == trial.fixationmove && 
		trainingstages.fixationScale[i] == trial.fixationScale && 
		trainingstages.fixedratio[i] == trial.fixedratio &&
		trainingstages.sampleON[i] == trial.sampleON && 
		trainingstages.gridscale[i] == trial.gridscale && 
		trainingstages.fixationgridindex[i] == trial.fixationgridindex && 
		trainingstages.samplegrid[i] == trial.samplegrid && 
		trainingstages.objectgrid[i].toString() == trial.objectgrid.toString() &&
		trainingstages.fixationusessample[i] == trial.fixationusessample &&  
		trainingstages.keepSampleON[i] == trial.keepSampleON && 
		trainingstages.nway[i] == trial.nway && 
		trainingstages.imageFolderSample[i] == trial.imageFolderSample && 
		trainingstages.sampleScale[i] == trial.sampleScale && 
		trainingstages.testScale[i] == trial.testScale && 
		trainingstages.hidetestdistractors[i] == trial.hidetestdistractors && 
		trainingstages.objectlist[i].toString() == trial.objectlist.toString())
		{
			//do nothing
		}

	else{
		// Current state of trial.[stuff] is incorrect; update parameters & reload images.
		trial.need2writeParameters=1;
		trial.automatorstagechange=1

		trial.rewardStage = trainingstages.rewardStage[i]
		trial.fixationmove = trainingstages.fixationmove[i]
		trial.fixationScale = trainingstages.fixationScale[i]
		trial.fixedratio = trainingstages.fixedratio[i]
		trial.sampleON = trainingstages.sampleON[i]
		trial.gridscale = trainingstages.gridscale[i]
		trial.fixationgridindex = [trainingstages.fixationgridindex[i]] // why is this in brackets?
		trial.samplegrid = [trainingstages.samplegrid[i]] // why is this in brackets?
		trial.objectgrid = trainingstages.objectgrid[i]
		trial.fixationusessample = trainingstages.fixationusessample[i]
		trial.keepSampleON = trainingstages.keepSampleON[i]
		trial.nway = trainingstages.nway[i]
		trial.imageFolderSample = trainingstages.imageFolderSample[i]
		trial.sampleScale = trainingstages.sampleScale[i]
		trial.testScale = trainingstages.testScale[i]
		trial.hidetestdistractors = trainingstages.hidetestdistractors[i] 
		trial.objectlist = trainingstages.objectlist[i] //todo
		console.log('Automator updated trial.[stuff] because of discrepancy between automator and params.')
	}

	if (writestr == "readtaskstageonly"){
		return trainingstages.current;
	}
//============== 2-CHECK CURRENT STAGE (end) ================//


//============== 3-COMPUTE PERFORMANCE ================//
	var startingindex = -1;
	for (var i = 0; i < trialhistory.trainingstage.length; i++){
		if (typeof(trialhistory.trainingstage[i]) == "undefined"){
			// Do nothing 
		}
		else if (
				trialhistory.trainingstage[i] == trainingstages.current 
				&& startingindex == -1 
				&& trialhistory.automator_filepath[i] == trial.automatorFilePath){ 
			startingindex = i;
		}
		else if (trialhistory.trainingstage[i] != trainingstages.current){ 
			startingindex = -1; 
		}
		else if (trialhistory.automator_filepath[i] != trial.automatorFilePath){ 
			startingindex = -1; 
		}
	}
	trialhistory.startingindex=startingindex

	var ntrial=0;
	var ncorrect=0;
	var pctcorrect
	if (startingindex == -1){
		pctcorrect = 0;
	}
	else{ //take running average
		var ncompleted = trialhistory.correct.length - startingindex;
		if (ncompleted > trainingstages.mintrials[trainingstages.current]){
			startingindex = trialhistory.correct.length - trainingstages.mintrials[trainingstages.current];
		}
		for (var i=startingindex; i<=trialhistory.correct.length-1; i++)
		{
			if (trialhistory.correct[i]==1){ncorrect++;}
			ntrial++;
		}
		pctcorrect = 100 * ncorrect/ntrial;
	}
	trialhistory.trainingstagename = trainingstages.stagename[trainingstages.current]
	trialhistory.pctcorrect = pctcorrect
	trialhistory.startingindex = startingindex
	trialhistory.ntrials_running = ntrial
	trialhistory.mintrials = trainingstages.mintrials[trainingstages.current]
	trialhistory.minpctcorrect = trainingstages.minpctcorrect[trainingstages.current]
//============== 3-COMPUTE PERFORMANCE (end) ================//

//============== 4-UPDATE STAGE ================//
	//Determine if updating stage and/or reward
	var updatingstage=0;

	if (pctcorrect >= trainingstages.minpctcorrect[trainingstages.current] && 
		ntrial >= trainingstages.mintrials[trainingstages.current] && 
		trainingstages.current < trainingstages.sampleON.length-1){
		updatingstage=1;
		trainingstages.current++;
	}

	if (updatingstage==1){
		// trial.need2loadParameters=1;
		trial.need2writeParameters=1;
		trial.automatorstagechange=1

		trial.currentAutomatorStage = trainingstages.current
		//update training stage
		trial.rewardStage = trainingstages.rewardStage[trainingstages.current]
		trial.fixationmove = trainingstages.fixationmove[trainingstages.current]
		trial.fixationScale = trainingstages.fixationScale[trainingstages.current]
		trial.fixedratio = trainingstages.fixedratio[trainingstages.current]
		trial.sampleON = trainingstages.sampleON[trainingstages.current]
		trial.gridscale = trainingstages.gridscale[trainingstages.current]
		trial.fixationgridindex = [trainingstages.fixationgridindex[trainingstages.current]] // why is this in brackets?
		trial.samplegrid = [trainingstages.samplegrid[trainingstages.current]] // why is this in brackets?
		trial.objectgrid = trainingstages.objectgrid[trainingstages.current]
		trial.fixationusessample = trainingstages.fixationusessample[trainingstages.current]
		trial.keepSampleON = trainingstages.keepSampleON[trainingstages.current]
		trial.nway = trainingstages.nway[trainingstages.current]
		trial.imageFolderSample = trainingstages.imageFolderSample[trainingstages.current]
		trial.sampleScale = trainingstages.sampleScale[trainingstages.current]
		trial.testScale = trainingstages.testScale[trainingstages.current]
		trial.hidetestdistractors = trainingstages.hidetestdistractors[trainingstages.current] 
		trial.objectlist = trainingstages.objectlist[trainingstages.current] //todo
		console.log('Automator updated trial.[stuff] because of stage change')

		//update trial history
		trialhistory.trainingstagename = trainingstages.stagename[trainingstages.current]
		trialhistory.pctcorrect = 0
		trialhistory.startingindex = -1
		trialhistory.ntrials_running = 0
		trialhistory.mintrials = trainingstages.mintrials[trainingstages.current]
		trialhistory.minpctcorrect = trainingstages.minpctcorrect[trainingstages.current]
//============== 4-UPDATE STAGE (end) ================//
	}
	else{
		return	
	}
}
//============== UPDATEORTASK ============== UPDATEORTASK ============== UPDATEORTASK ============ //