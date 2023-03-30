import './App.css';
import { useRef, useState } from "react";

function App() {

  const inputAge = useRef();
  const inputSex = useRef();
  const inputAchieve = useRef();
  const inputWeight = useRef();


  const [loading, setLoading] = useState(false);
  async function handleSend() {
    const age = inputAge.current.value;
    console.log(age)
    const sex = inputSex.current.value;
    console.log(sex)
    const achieve = inputAchieve.current.value;
    console.log(achieve)
    const weight = inputWeight.current.value;
    console.log(weight)
    setLoading(true);

    if (age == "") {
      alert("Please input age")
      setLoading(false);
    }

    if (sex == "") {
      alert("Please input sex")
      setLoading(false);
    }

    if (achieve == "") {
      alert("Please input achieve")
      setLoading(false);
    }

    if (weight == "") {
      alert("Please input weight")
      setLoading(false);
    }

    if (age != "" && sex != "" && achieve != "" && weight != "") {
      // workout plan
      var prompt = `
      Generate me a workout plan for the information below.\n
      Age: ${age}\n
      Gender: ${sex}\n
      Weight: ${weight}\n
      I want to achieve these goals: ${achieve}
      `
      const DEFAULT_PARAMS = {
        "model": "gpt-3.5-turbo",
        "messages": [
          { role: "system", content: "You are ChatGPT, a large language model trained by OpenAI. Answer only to topics related to fitness, nutrition, meal plans etc." },
          { role: "user", content: prompt }
        ],
      }

      const params = { ...DEFAULT_PARAMS };
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(process.env.REACT_APP_OPEN_AI_KEY)
        },
        body: JSON.stringify(params)
      };
      const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
      const data = await response.json();
      var workoutPlan= data.choices[0].message.content
    

      // meal plan
      var mealPrompt=` Generate me a meal plan with nutritions for the workout plan given below.\n
      ${workoutPlan}
      `
      const DEFAULT_PARAMS1 = {
        "model": "gpt-3.5-turbo",
        "messages": [
          { role: "system", content: "You are ChatGPT, a large language model trained by OpenAI. Answer only to topics related to fitness, nutrition, meal plans etc." },
          { role: "user", content: mealPrompt }
        ],
      }

      const params1 = { ...DEFAULT_PARAMS1 };
      const requestOptions1 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + String(process.env.REACT_APP_OPEN_AI_KEY)
        },
        body: JSON.stringify(params1)
      };
      const response1 = await fetch('https://api.openai.com/v1/chat/completions', requestOptions1);
      const data1 = await response1.json();
      var mealPlan= data1.choices[0].message.content
      
      document.getElementById("workout_result").value = workoutPlan
      document.getElementById("meal_result").value = mealPlan
    }
  };



  return (
    <>
      <div class="container-fluid mb-2">
        <div class="row">
          <div class="col-10 mx-auto">
            <h2 id="intro" style={{ textAlign: "center" }}>AI Meal Planner</h2>
          </div>
        </div>
      </div>

      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-md-6 col-lg-6 col-xl-6 col-12">

            <div class="form-group mx-auto">
              <label>Age*</label>
              <input
                type="number"
                ref={inputAge}
                class="form-control col"
                placeholder="Example 22"
                required
              />

            </div>

            <div class="form-group mx-auto">
              <label>Gender*</label>
              <select class="form-control" name="gender" id="gender" ref={inputSex} required>
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div class="form-group mx-auto">
              <label>What you want to achieve*</label>
              <input
                type="text"
                ref={inputAchieve}
                class="form-control col"
                placeholder="I want to me fit"
                required
              />

            </div>

            <div class="form-group mx-auto">
              <label>Weight (in kg)*</label>
              <input
                type="number"
                ref={inputWeight}
                class="form-control col"
                placeholder="Example 50"
                required
              />

            </div>






            <div class="row">
              <div class="col-12 text-center mx-auto">
                <button disabled={loading} class="btn btn-primary" onClick={handleSend}>
                  {/* <button class="btn" onClick={handleSend}> */}
                  Generate
                </button>

                {/* <button type="button" class="btn btn-primary" id="submitButton">Generate</button> */}
              </div>
            </div>

          </div>

          <div class="col-md-6 col-lg-6 col-xl-6 col-12">
            <div class="col-lg-12 mx-auto" id="">
              <div class="form-group mx-auto">
                <label for="">Workout Plan
                </label>
                <textarea class="form-control" placeholder="" rows="8"
                  id="workout_result"></textarea>
              </div>
              <br></br>
              <div class="form-group mx-auto">
                <label for="">Meal Plan
                </label>
                <textarea class="form-control" placeholder="" rows="8"
                  id="meal_result"></textarea>
              </div>

            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default App;
