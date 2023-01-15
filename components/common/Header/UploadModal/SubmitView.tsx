import Radio from "@/components/atoms/Radio";

export default function SubmitView() {
  return (
    <div className="px-6">
      <h2 className="text-base mb-large">공개범위</h2>
      <form>
        <Radio
          id="entire"
          label="전체"
          name="open-range"
          description="누구나 볼 수 있습니다."
          checked
        />
        <Radio
          id="part"
          label="일부"
          name="open-range"
          description="링크가 있으면 누구든 볼 수 있습니다."
        />
        <Radio
          id="private"
          label="비공개"
          name="open-range"
          description="나와 내가 선택한 사람만 볼 수 있습니다."
        />
      </form>
    </div>
  );
}
